export function decodeURI (value)
{
    return decodeURIComponent(value.replace(/\+/g, ' '));
}
