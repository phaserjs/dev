import dirTree from 'directory-tree';
import fs from 'fs-extra';

const rootDir = './public/';
const examplesJSON = './public/examples.json';

const filterConfig = {
    extensions: /\.js$/,
    normalizePath: true,
    exclude: [
        /public\\assets/,
        /public\/assets/,
        /public\\libs/,
        /public\/libs/
    ]
};

export function buildExamples ()
{
    let filteredTree = dirTree(rootDir, filterConfig);

    filteredTree = JSON.stringify(filteredTree, null, 2);
    
    fs.writeFileSync(examplesJSON, filteredTree);
            
    return 'examples.json saved';
}
