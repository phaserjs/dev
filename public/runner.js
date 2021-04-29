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
