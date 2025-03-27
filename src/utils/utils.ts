export const sliceDescription = (str: string, sliceCount: number) => {
    if (str.length <= sliceCount) return str;
    return `${str.slice(0, sliceCount)}...`;
};