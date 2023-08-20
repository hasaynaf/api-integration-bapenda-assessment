/**
 * Module dependencies.
 */
const axios = require('axios').default;

const fetchDataApi1 = async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
    return response.data
}

const fetchDataApi2 = async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/comments')
    return response.data
}

const onlyOdd = (array) => {
    let newArray = array.filter((item) => {
        return item.id % 2 != 0
    })

    return newArray
}

const processingData = async () => {
    // filter only odd
    const filter = onlyOdd(await fetchDataApi1())

    const api2 = await fetchDataApi2()
    let newArray = []
    let comments = []
    let totalCommentAllPost = 0

    // foreach filter data
    filter.forEach(async (item,index) => {
        api2.forEach((item2,index2) => {
            if (item.id == item2.postId) {
                comments.push(item2)
            }
        })

        // count comment
        let totalComment = comments.length

        newArray.push({
            id : item.id,
            title : item.title,
            totalComment : totalComment
        })
    })

    // calculate total comment all post
    newArray.forEach((item, index) => {
        totalCommentAllPost += item.totalComment
    })

    return {
        newArray : newArray,
        totalCommentAllPost : totalCommentAllPost,
    }
}

const controller = {}

controller.output = async (req, res, next) => {
    try {
        const data = (await processingData()).newArray
        const totalCommentAllPost = (await processingData()).totalCommentAllPost
        
        return res.status(200).send({
            listPost : data,
            totalCommentAllPost : totalCommentAllPost
        })
    } catch (error) {
        return res.status(500).send({
            code :"0",
            status : "Failed",
            message : error.message
        })
    }
}

module.exports = controller
