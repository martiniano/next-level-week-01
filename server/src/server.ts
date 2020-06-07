import express from 'express';
import path from 'path';
import cors from 'cors';
import routes from './routes';
import { errors, isCelebrate } from 'celebrate';

const app = express();

app.use(cors({
    
}));

app.use(express.json());

app.use(routes);

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

//app.use(errors());

app.use((err: any, req: any, res: any, next: any) => {
    if (isCelebrate(err)) {
        return res.status(400).send({
            statusCode: 400,
            message: err.joi.message,
            details: err.joi.details
        });
    }

    return next(err);
})

app.listen(3333);

// Run with: npm run dev