const db = require('../../config/db')
const fs = require('fs')

module.exports = {

    create({filename, path, products_id}){
        const query = `
            INSERT INTO files (
                name,
                path,
                products_id
            ) VALUES ($1, $2, $3)
            RETURNING id
        `
        const values = [
            filename,
            path,
            products_id
        ]
        
        return db.query(query, values)
    },
    async delete(id){

        try {

            const result = await db.query(`SELECT * FROM files WHERE id = $1`, [id])
            const file = result.rows[0]

            fs.unlink(file.path, (err) => {
                if (err) throw err
                return db.query(`DELETE FROM files WHERE id = $1`, [id])
            })

        }catch(err){
            console.error(err)
        }

        
    }

}