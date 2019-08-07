// trm.controller

import { Router, Request, Response, NextFunction } from "express";
import {  ServerError } from "../utils/http.util";
import { IDAL  } from "../dal/IDAL";
import { TrmDAL } from "../dal/TrmDAL";
import { TRM } from "../models/TRM";

const router = Router();

const trmDAL:IDAL<TRM> = new TrmDAL()
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
 
  const page  = +(req.query.page || 0)
  const limit = +(req.query.limit || 0)
  try {
   
    const rateHistory = await trmDAL.GetAllRecords(page,limit)
    res.json(rateHistory);
  } catch (error) {
    next(new ServerError({ message: error.message }));
  }
});


export default router;
