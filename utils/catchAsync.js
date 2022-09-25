// not repeat the catch block in every controller
// instead use a high order function to wrap the async function

const catchAsync = fn => {
    return (req, res, next) => fn(req, res, next).catch(next);
}

export default catchAsync;