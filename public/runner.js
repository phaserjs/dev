import { Panel, TreeView, TreeViewItem } from './pcui.js';

const p = new Panel();

p.headerText = "Examples";
p.width = 250;
p.collapsible = true;
p.scrollable = true;

const t = new TreeView();

const a1 = new TreeViewItem({ text: 'Commodore' });
const a2 = new TreeViewItem({ text: 'Sinclair' });
const a3 = new TreeViewItem({ text: 'Atari' });

console.log(a1.iconLabel);

const b1 = new TreeViewItem({ text: 'C64' });
const b2 = new TreeViewItem({ text: 'Amiga' });

const c1 = new TreeViewItem({ text: 'Amiga 500' });
const c2 = new TreeViewItem({ text: 'Amiga 1200' });

t.append(a1);
t.append(a2);
t.append(a3);

a1.append(b1);
a1.append(b2);

b2.append(c1);
b2.append(c2);

p.append(t);

b2.open = true;

document.body.appendChild(p.dom);

// document.body.appendChild(t.dom);

/*
function decodeURI (value)
{
    return decodeURIComponent(value.replace(/\+/g, ' '));
}

const params = new URLSearchParams(document.location.search);

const filename = params.get('f');

if (filename)
{
    const example = document.createElement('script');

    // example.type = 'module';
    example.src = decodeURI(filename).split('\\').join('/');
    
    document.body.appendChild(example);
}
*/
