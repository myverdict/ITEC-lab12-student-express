// structure of the student object
module.exports = (sequelize, DataTypes) => {
    let Student = sequelize.define('Student', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        starID: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        present: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    })

    // create a database: force is true means it will overwrite any old database tables
    // for e.g., if the structure of the database is changed, the database will be updated
    Student.sync( {force: false} ).then( () => {
        console.log('Synced student table')
    })

    return Student
}