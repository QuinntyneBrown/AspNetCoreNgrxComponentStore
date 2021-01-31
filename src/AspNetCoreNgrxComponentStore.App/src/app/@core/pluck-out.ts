export const pluckOut = (options: { items:any[], value:any, key: string}) => {

    const i = options.items.map(x => x[options.key]).indexOf(options.value[options.key]);

    options.items.splice(i,1);
    
    return options.items;
}