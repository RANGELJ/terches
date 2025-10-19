const not = (original: () => boolean) => () => !original()

export default not
