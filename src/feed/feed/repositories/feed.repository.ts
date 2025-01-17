import { Injectable } from "@nestjs/common";
import { HttpClient, HttpResponse } from "src/infra/htp-client";
import { Position } from "src/interfaces/feed/position";

@Injectable()
export class FeedRepository {
    constructor() {}

    async getPositions() {
        return await HttpClient<Position[]>(
            `${process.env.NEXT_PUBLIC_URL_API_BACKEND}/position`,
            {
                method: "GET",
                headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}` },
                refresh: true,
            },
        ).then((res: HttpResponse<Position[]>) => {
            if (!res.ok) throw new Error();
            const body = res.body;
            return body;
        }); 
    }
}