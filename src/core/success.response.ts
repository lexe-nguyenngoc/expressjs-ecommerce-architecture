import { ReasonPhrases, StatusCode } from "@/constants";
import { Response } from "express";

interface Data {
  [key: string]: any;
}

interface Metadata {
  data: Data | Data[];
  pagination?: {
    _limit: number;
    _page: number;
    _totalRow: number;
  };
  tokens?: {
    accessToken: string;
    refreshToken: string;
  };
  [key: string]: any;
}

export class SuccessResponse {
  metadata: Metadata;
  message: string;
  status: StatusCode;

  constructor(
    metadata: Metadata,
    message: string,
    status = StatusCode.OK,
    reason = ReasonPhrases.OK
  ) {
    this.metadata = metadata;
    this.message = message ?? reason;
    this.status = status;
  }

  send(res: Response) {
    return res.status(this.status).json(this);
  }
}

export class OK extends SuccessResponse {}

export class CREATED extends SuccessResponse {
  constructor(metadata: Metadata, message: string) {
    super(metadata, message, StatusCode.CREATED, ReasonPhrases.CREATED);
  }
}
