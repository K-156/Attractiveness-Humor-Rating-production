const isAllAnswer = (data, expectedLen) => {

    if (data !== undefined && Object.keys(data).length === expectedLen) {
        return false;
    }
    
    return true;
}

export { isAllAnswer };