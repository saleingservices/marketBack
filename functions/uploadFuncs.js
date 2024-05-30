let fs = require('fs');
let path = require('path');
const db = require('../models')

async function DeleteFolder(_model, _recordId, _directoryPath) {
    const tables = ['user', 'category', 'product', 'saleLists', 'invoice', 'message']
    if (tables.includes(_model)) {
        _directoryPath ??= path.join(__basedir,'upload',_model,_recordId)
        try {
            fs.rmdirSync(_directoryPath, { recursive: true});
            return true
        } catch (error) {
            return false
        }

    }
}

async function SwitchTables(_tableName) {
    switch (_tableName) {
        case 'user':
            return db.user
        case 'category':
            return db.category
        // case 'product':
        //     return db.product
        // case 'saleLists':
        //     return db.saleLists
        // case 'userprofile':
        //     return db.userProfile
        default:
            return null
    }
}

async function Trnasformer(_req) {
    let directory, where = { id: _req.body.idInDirectory }
    if (_req.body.idInDirectory != 'userprofile')
        directory = _req.body.directory
    else {
        directory = _req.body.idInDirectory
        where = { userId: _req.body.directory.split('\/')[1] }
    }
    return [directory, where]
}


const Upload = {
    DeleteFolder,
    SwitchTables,
    Trnasformer,
}
module.exports = Upload