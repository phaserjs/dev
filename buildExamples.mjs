import dirTree from 'directory-tree';
import fs from 'fs-extra';

const rootDir = './examples/live/';
const examplesJSON = './examples/live/examples.json';

const filterConfig = {
    extensions: /\.js$/,
    normalizePath: true,
    attributes: ["type"],
    exclude: [
        /examples\\live\\assets/,
        /examples\/live\/assets/,
        /examples\\live\\libs/,
        /examples\/live\/libs/
    ]
};

export function buildExamples ()
{
    let filteredTree = dirTree(rootDir, filterConfig);

    filteredTree = JSON.stringify(filteredTree, null, 2);
    
    fs.writeFileSync(examplesJSON, filteredTree);
            
    return 'examples.json saved';
}
