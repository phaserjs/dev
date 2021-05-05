import { decodeURI } from './decodeURI.js';

const example = document.createElement('script');

// example.type = 'module';

document.body.appendChild(example);

const params = new URLSearchParams(document.location.search);

const filename = params.get('f');

if (filename)
{
    example.src = decodeURI(filename).split('\\').join('/');

    document.body.title = example.src;
}
