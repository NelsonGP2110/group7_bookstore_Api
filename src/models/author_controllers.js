import Authors from '../models/author_model';

//-------------------CREATE BOOK------------------//
export const createAuthor = async (req, res) => {
    const { first_name, last_name, biography, publisher } = req.body;

    try {
        const author = await Authors.create({
            first_name,
            last_name,
            biography,
            publisher,
        });

        res.status(201).json({
            msg: 'Author successfully created',
            author,
        });
    } catch (error) {
        res.status(400).json({
            msg: 'One or more values are invalid. Please check data and try again.',
        });
    }
};
