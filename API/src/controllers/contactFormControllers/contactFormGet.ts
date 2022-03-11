import { Request, Response } from "express";
import { IMatchObject } from "../../interfaces/other/IMatch";
import { ISortObject } from "../../interfaces/other/ISort";
import ContactForm from "../../models/contactFormModel";
import { createErrorMessage } from "../../utils/messages/createErrorMessage";

const contactFormGet = async (req: Request, res: Response) => {
  try {
    const match: IMatchObject = {};
    const sort: ISortObject = {};

    if (req.query.isResolvedMatch) {
      match.isResolved = req.query.isResolvedMatch === 'true';
    }

    if (req.query.isResolvedSort) {
      sort.isResolved = (req.query.isResolvedSort === 'desc') ? -1 : 1;
    }

    if (req.query.createdAt) {
      sort.createdAt = (req.query.createdAt === 'desc') ? -1 : 1;
    }

    if (req.query.updatedAt) {
      sort.updatedAt = (req.query.updatedAt === 'desc') ? -1 : 1;
    }

    const contactFroms = await ContactForm.find(match)
      .sort(sort)
      .limit(req.query.limit ? +req.query.limit : 15)
      .skip(req.query.skip ? +req.query.skip : 0);

    res.status(200).send(contactFroms);
  } catch (error) {
    const errorMessage = createErrorMessage(500, 'Get contact from failed', error);
    res.status(errorMessage.status).send(errorMessage);
  }
}

export default contactFormGet;