import { decodeURI } from './decodeURI.js';
import { loadFile } from './loadFile.js';

window.onload = () => {

    const params = new URLSearchParams(document.location.search);
    
    const filename = params.get('f');
    
    if (filename)
    {
        const path = decodeURI(filename).split('\\').join('/');

        loadFile(path, (data) => {

            // data = data.replace('<', '&lt;');
            // data = data.replace('&', '&amp;');

            document.getElementById('code').innerHTML = Prism.highlight(data, Prism.languages.typescript, 'typescript');

        });
    }
    
};
