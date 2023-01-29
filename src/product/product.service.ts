import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductInput, UpdateProductInput } from 'src/types/graphql';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}
  create({ productName, description, price, stocks }: CreateProductInput) {
    return this.prisma.product.create({
      data: { productName, description, price, stocks },
    });
  }

  findAll() {
    return this.prisma.product.findMany();
  }

  findOne(id: number) {
    return this.prisma.product.findUnique({
      where: { id },
      select: {
        id: true,
        productName: true,
        description: true,
        price: true,
        stocks: true,
        createdAt: false,
        updatedAt: false,
      },
    });
  }

  update(
    id: number,
    { productName, description, price, stocks }: UpdateProductInput,
  ) {
    return this.prisma.product.update({
      where: { id },
      data: { productName, description, price, stocks },
    });
  }

  remove(id: number) {
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
