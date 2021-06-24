/** Cheks if image belongs to image/thumb folder. Returns 'image', 'thumb', 'none' strings*/
const validateQuery = (
    filename: string,
    height: number,
    width: number
): string => {
    if (filename && !height && !width) {
        return 'images';
    } else if (filename && height && width) {
        return 'thumb';
    } else {
        return 'none';
    }
};

export { validateQuery };
