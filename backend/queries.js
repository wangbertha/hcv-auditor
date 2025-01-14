if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
})

const getAllListings = (request, response) => {
  pool.query("SELECT * FROM hcv_match WHERE status<>'Complete' ORDER BY status, dateupdated LIMIT 25", (error, results) => {
    if (error) {
      response.status(500).json(error)
    }
    else {
      response.status(200).json(results.rows)
    }
  })
}

const getListingById = (request, response) => {
    const id = parseInt(request.params.id)
  pool.query("SELECT * FROM hcv_match WHERE id = $1", [id], (error, results) => {
    if (error) {
      response.status(500).json(error)
    }
    else {
      response.status(200).json(results.rows)
    }
  })
}

const updateField = (request, response) => {
    const id = parseInt(request.params.id)
    const { field, value } = request.body

    if (field == "exclusionary") {
        pool.query(
            'UPDATE hcv_match SET exclusionary = $1 WHERE id = $2', [value, id],
            (error, results) => {
                if (error) {
                    throw error
                }
                response.status(200).send(`Listing modified with ID: ${id}`)
            }
        )
    }
    else if (field == "actions_taken") {
        pool.query(
            'UPDATE hcv_match SET actions_taken = $1 WHERE id = $2', [value, id],
            (error, results) => {
                if (error) {
                    throw error
                }
                response.status(200).send(`Listing modified with ID: ${id}`)
            }
        )
    }
    else if (field == "referred_to") {
        pool.query(
            'UPDATE hcv_match SET referred_to = $1 WHERE id = $2', [value, id],
            (error, results) => {
                if (error) {
                    throw error
                }
                response.status(200).send(`Listing modified with ID: ${id}`)
            }
        )
    }
    else if (field == "status") {
        pool.query(
            'UPDATE hcv_match SET status = $1 WHERE id = $2', [value, id],
            (error, results) => {
                if (error) {
                    throw error
                }
                response.status(200).send(`Listing modified with ID: ${id}`)
            }
        )
    }
    else if (field == "reviewer") {
        pool.query(
            'UPDATE hcv_match SET reviewer = $1 WHERE id = $2', [value, id],
            (error, results) => {
                if (error) {
                    throw error
                }
                response.status(200).send(`Listing modified with ID: ${id}`)
            }
        )
    }
    else if (field == "notes") { 
        pool.query(
            'UPDATE hcv_match SET notes = $1 WHERE id = $2', [value, id],
            (error, results) => {
                if (error) {
                    throw error
                }
                response.status(200).send(`Listing modified with ID: ${id}`)
            }
        )
    }
}

//export database functions
module.exports = {
  getAllListings,
  getListingById,
  updateField
}