/** Cheks if image belongs to image/thumb folder. Returns 'images, 'thumb' strings*/
const dispatchQuery = (
    filename: string,
    height: number,
    width: number
): string => {
    if (filename && height && width) {
        return 'thumb';
    } else {
        return 'images';
    }
};

export { dispatchQuery };
