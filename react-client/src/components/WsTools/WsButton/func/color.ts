export const titleColorType = (title:string) => {
    let colorType = '';
    switch (title) {
        case '编辑':
            colorType = 'primary';
            break;
        case '删除':
            colorType = 'danger';
            break;
        case '添加':
            colorType = 'white';
            break;
        default:
            colorType = 'white';
    }
    return colorType;
};