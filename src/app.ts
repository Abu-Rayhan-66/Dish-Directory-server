import { Application, Request, Response } from "express";
import express from "express"
import cors from "cors"
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import { paymentRoute } from "./app/modules/payment/payment.route";
import path from "path";



const app: Application = express();

app.use(express.static(path.join(__dirname,"../public")))

app.use(express.json());

app.use(cors({origin:"http://localhost:3000", credentials:true}));
// app.use(cors({origin:"https://dish-directory-client.vercel.app", credentials:true}));

// application routes
app.use("/api", router);
app.use("/api/payment", paymentRoute);

app.get('/', (req: Request, res: Response) => {
    res.send('welcome to the server')
  })

app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;
