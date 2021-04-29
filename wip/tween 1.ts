import { AddChild, AddChildren } from '../../src/display';
import { BackgroundColor, CanvasRenderer, Parent, Scenes, Size, WebGLRenderer } from '../../src/config';

import { Game } from '../../src/Game';
import { IBaseWorld } from '../../src/world/IBaseWorld';
import { IEventInstance } from '../../src/events/IEventInstance';
import { ImageFile } from '../../src/loader/files/ImageFile';
import { Loader } from '../../src/loader/Loader';
import { On } from '../../src/events';
import { Quadratic } from '../../src/math/easing';
import { Scene } from '../../src/scenes/Scene';
import { Sprite } from '../../src/gameobjects';
import { StaticWorld } from '../../src/world/StaticWorld';

class TweenProperty
{
	name: string;
	start: number;
	end: number;
	delta: number;
	next: TweenProperty;

	constructor (name: string, end: number, next: TweenProperty)
	{
		this.name = name;
		this.end = end;
		this.next = next;
	}

	init (target: object, reversed: boolean): void
	{
		if (reversed)
		{
			this.start = this.end;
			this.end = target[this.name];
			target[this.name] = this.start;
		}
        else
        {
            this.start = target[this.name];
        }

		this.delta = this.end - this.start;
	}

	dispose (): void
	{
        if (this.next)
        {
            this.next.dispose();
        }

        this.next = null;
	}
}

class CompleteData
{
	private callback: Function;
	private args: [];
	private chain: Tween[];
	private diff: number;

	constructor (callback: Function, args: [], chain: Tween[], diff: number)
	{
		this.callback = callback;
		this.args = args;
		this.chain = chain;
		this.diff = diff;
	}

	execute (): void
	{
		if (this.callback)
		{
			this.callback.apply(null, this.args);
			this.callback = null;
		}

        this.args = null;

        if (this.chain)
		{
			const len: number = this.chain.length;

            for (let i: number = 0; i < len; i++)
            {
                new Tween(this.chain[i]).start(false, this.diff);
            }

            this.chain = null;
		}
	}
}

class Tween
{
    static defaultEasing: Function = Quadratic.Out;

    private static running: Map<any, Tween> = new Map();
    private static head: Tween;
    private static tweenCount: number = 0;
    private static world: IBaseWorld;
    private static _updateListener: IEventInstance;

    private prev: Tween;
    private next: Tween;
    private rnext: Tween;
    private isDead: boolean;

    private target: object;
    private reversed: boolean;
    private overwrite: boolean;
    private autoStart: boolean;
    private _configured: boolean;
    private _started: boolean;
    private _inited: boolean;
    private duration: any;
    private _duration: number;
    private _ease: Function;
    private startTime: number;
    private endTime: number;
    private properties: TweenProperty;
    private autoVisible: boolean;
    private _chain: Tween[];

    private _onStart: Function;
    private _onStartArgs: [];
    private _onUpdate: Function;
    private _onUpdateArgs: [];
    private _onComplete: Function;
    private _onCompleteArgs: [];

    constructor (target: Object, autoStart: boolean = true)
    {
        this.target = target;
        this.autoStart = autoStart;
        this._ease = Tween.defaultEasing;
    }

    static init (world: IBaseWorld): void
    {
        this.world = world;

        this._updateListener = On(world.scene, 'update', (delta: number, time: number) => this.updateTweens(delta, time));
    }

    static killAllTweens (): void
    {
        this.running.forEach(tween =>
        {
            tween.isDead = true;
            tween.dispose();
        });
    }

    static killTweensOf (target: unknown): void
    {
    }

    static pauseAllTweens (): void
    {
    }

    static resumeAllTweens (): void
    {
    }

    static updateTweens (delta: number, time: number): void
    {
        if (!this.head)
        {
            return;
        }

        const complete: CompleteData[] = [];
        let ct: number = 0;
        let t: Tween = this.head;
        let cpt: number = 0;

        while (t)
        {
            cpt++;

            let isComplete: boolean;

            if (t.isDead)
            {
                isComplete = true
            }
            else
            {
                isComplete = time >= t.endTime;

                let k = (isComplete) ? 1.0 : (time - t.startTime) / t._duration;
                let ke = t._ease(k || 0);
                let target = t.target;

                //  update
                let p: TweenProperty = t.properties;

                while (p)
                {
                    target[p.name] = p.start + p.delta * ke;
                    p = p.next;
                }
            }

            if (isComplete)
            {
                if (t._started)
                {
                    let cd = new CompleteData(t._onComplete, t._onCompleteArgs, t._chain, t.endTime - time);
                    t._chain = null;
                    complete.unshift(cd);
                    ct++;
                }

                t.isDead = true;
                t.detach();
                t.dispose();

                let dead: Tween = t;
                let prev: Tween = t.prev;
                t = dead.next;

                if (prev)
                {
                    prev.next = t;

                    if (t)
                    {
                        t.prev = prev;
                    }
                }
                else
                {
                    this.head = t;

                    if (t)
                    {
                        t.prev = null;
                    }
                }

                dead.prev = dead.next = null;
            }
            else
            {
                t = t.next;
            }
        }

        if (ct)
        {
            for (let i = 0; i < ct; i++)
            {
                complete[i].execute();
            }
        }

        this.tweenCount = cpt;
    }

    kill (setEndValues: boolean = false): void
    {
        if (this.isDead)
        {
            return;
        }

        if (setEndValues)
        {
            this._onUpdate = null;
            this._onComplete = null;

            this.update(this.endTime);
        }
        else
        {
            this.detach();
            this.dispose();
        }

        this.isDead = true;
    }

    killTweens (): this
    {
        Tween.killTweensOf(this.target);

        return this;
    }

    updateNow (): this
    {
        if (this._started)
        {
            let t: number = Math.max(this.startTime, performance.now());

            this.update(t);
        }
        else
        {
            this.init();
            this.endTime = this._duration = 1;
            this.update(0);
        }

        return this;
    }

    private configure (duration: number, newState: Object = {}, reversed: boolean = false): void
    {
        this._configured = true;
        this.reversed = reversed;
        this.duration = duration;

        for (let name in newState)
        {
            let value = newState[name];

            // if (value is Array && target[name] is Number)
            // {
            //     if ("__bezier" in specialProperties)
            //     {
            //         specials = new specialProperties["__bezier"](target, name, value, specials);
            //         slowTween = true;
            //     }
            //     continue;
            // }

            this.properties = new TweenProperty(name, value, this.properties);
        }
    }

    start (killTargetTweens: boolean = true, timeOffset: number = 0): void
    {
        if (this._started) return;
        if (!this._inited) this.init();
        this.overwrite = killTargetTweens;

        this.startTime = performance.now() + timeOffset;
        this._duration = this.duration * 1000;
        this.endTime = this.startTime + this._duration;

        if (this.reversed || this._duration == 0) this.update(this.startTime);

        this._started = true;

        this.attach(this.overwrite);
    }

    private init (): void
    {
        if (this._inited) return;

        let p: TweenProperty = this.properties;

        while (p) { p.init(this.target, this.reversed); p = p.next; }

        this._inited = true;
    }

    easing (f: Function): this
    {
        this._ease = f || Tween.defaultEasing;

        return this;
    }

    private update (time: number): void
    {
        let h: Tween = Tween.head;

        Tween.head = this;

        Tween.updateTweens(0, time);

        Tween.head = h;
    }

    private attach (overwrite: boolean): void
    {
        let parallel: Tween = null;

        if (overwrite) Tween.killTweensOf(this.target);
        else parallel = Tween.running.get(this.target);

        if (parallel)
        {
            this.prev = parallel;
            this.next = parallel.next;

            if (this.next) this.next.prev = this;
            parallel.next = this;
            this.rnext = parallel;
        }
        else
        {
            if (Tween.head) Tween.head.prev = this;
            this.next = Tween.head;
            Tween.head = this;
        }

        Tween.running.set(this.target, this);
    }

    private detach (): void
    {
        if (this.target && this._started)
        {
            let targetTweens: Tween = Tween.running.get(this.target);

            if (targetTweens === this)
            {
                if (this.rnext) Tween.running.set(this.target, this.rnext);
                else Tween.running.delete(this.target);
            }
            else if (targetTweens)
            {
                let prev: Tween = targetTweens;

                targetTweens = targetTweens.rnext;

                while (targetTweens)
                {
                    if (targetTweens === this)
                    {
                        prev.rnext = this.rnext;
                        break;
                    }

                    this.prev = targetTweens;

                    targetTweens = targetTweens.rnext;
                }
            }

            this.rnext = null;
        }
    }

    private dispose (): void
    {
        if (this._started)
        {
            this.target = null;
            this._onComplete = null;
            this._onCompleteArgs = null;

            if (this._chain)
            {
                this._chain.forEach(tween =>
                {
                    tween.dispose();
                });

                this._chain = null;
            }
        }

        if (this.properties) { this.properties.dispose(); this.properties = null; }

        this._ease = null;
        this._onStart = null;
        this._onStartArgs = null;
    }

    delay (duration: number, overwrite: boolean = true): Tween
    {
        return this.add(duration, null, overwrite);
    }

    apply (newState: Object = null, overwrite: boolean = true): Tween
    {
        return this.add(0, newState, overwrite);
    }

    to (duration: number, newState: Object = null, overwrite: boolean = true): Tween
    {
        return this.add(duration, newState, overwrite);
    }

    from (duration: number, fromState: Object = null, overwrite: boolean = true): Tween
    {
        return this.add(duration, fromState, overwrite, true);
    }

    private add (duration: number, state: Object, overwrite: boolean, reversed: boolean = false): Tween
    {
        if (this.isDead) return new Tween(this.target).add(duration, state, overwrite, reversed);

        if (this._configured) return this.chain().add(duration, state, overwrite, reversed);

        this.configure(duration, state, reversed);

        if (this.autoStart) this.start(overwrite);

        return this;
    }

    chain (target: Object = null): Tween
    {
        let tween: Tween = new Tween(target || this.target, false);

        if (!this._chain) this._chain = [];

        this._chain.push(tween);

        return tween;
    }

    get isStarted (): boolean { return this._started; }

    get isFinished (): boolean { return this.isDead; }
}

function tween (target: Object): Tween
{
    return new Tween(target);
}

class Demo extends Scene
{
    constructor ()
    {
        super();

        const world = new StaticWorld(this);

        Tween.init(world);

        const loader = new Loader();

        loader.setPath('/phaser4-examples/public/assets/');
        // loader.setPath('/examples/public/assets/');

        loader.add(ImageFile('logo', 'logo.png'));

        loader.start().then(() => {

            const block = new Sprite(400, 100, 'logo');

            tween(block).to(3, { y: 500, rotation: 0.2 });

            AddChildren(world, block);

        });

    }
}

export default function (): void
{
    new Game(
        WebGLRenderer(),
        Size(800, 600),
        Parent('gameParent'),
        BackgroundColor(0x2d2d2d),
        Scenes(Demo)
    );
}
