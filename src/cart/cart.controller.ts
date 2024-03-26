import { Controller, Get, Post, Body, UseGuards, Delete } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { Cart } from './entities/cart.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserId } from 'src/decorators/user-id.decorator';
@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async getCart(@UserId() id: number): Promise<Cart> {
    return await this.cartService.getCart(id);
  }

  @Post('/add')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async addToCart(
    @Body() dto: CreateCartDto,
    @UserId() id: number,
  ): Promise<Cart> {
    return await this.cartService.addToCart(dto, id);
  }

  @Post('/remove')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async removeFromCart(
    @Body() dto: CreateCartDto,
    @UserId() id: number,
  ): Promise<Cart> {
    return await this.cartService.removeFromCart(dto, id);
  }

  @Delete('/clear')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async clearCart(@UserId() id: number): Promise<void> {
    await this.cartService.clearCart(id);
  }
}
