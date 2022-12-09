const isValid = (rating, expectedLen) => {
    const valueList = Object.values(rating)
    if (valueList.includes("") || valueList.length < expectedLen) {
        return false
    }
    return true
}

export { isValid };
