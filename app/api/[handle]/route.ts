import { NextRequest, NextResponse } from "next/server"
import { getProduct } from "../../../lib/shopify"

export async function GET(
  req: NextRequest,
  context: { params: Record<string, string> }
) {
  const handle = context.params.handle

  const product = await getProduct(handle)

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 })
  }

  return NextResponse.json(product)
}
