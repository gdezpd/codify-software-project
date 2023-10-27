import {NextResponse} from "next/server";
import {bd} from './bd'

export async function GET (req:Request) {
    return NextResponse.json(bd.finance.periods.graph)
}

