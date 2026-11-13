function makeGetAll(getAllDatabaseFunction) {
    
    return async function (req, res) {
        const entityRows = await getAllDatabaseFunction();
        res.json(entityRows);
    }
}

module.exports = makeGetAll;
