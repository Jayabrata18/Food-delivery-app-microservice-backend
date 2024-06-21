import { CreateRestaurantDto } from '@app/common/dtos/create-restaurant.dto';
import { CreateMenuItemDto } from '@app/common/dtos/menuItems.dto';
import { Restaurant } from '@app/common/entity';
import { MenuItems } from '@app/common/entity/restaurant/menuItems.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RestaurantsMicroserviceService {
  constructor(
    @InjectRepository(Restaurant) private readonly restaurantRepository: Repository<Restaurant>,
    @InjectRepository(MenuItems) private readonly menuItemRepository: Repository<MenuItems>) { }
  
  //create-restaurant
  createRestaurant(restaurantDto: CreateRestaurantDto) {
    const newRestaurant = this.restaurantRepository.create(restaurantDto);
    return this.restaurantRepository.save(newRestaurant);
  }
  //get all-restaurants
  async getAllRestaurants() {
    return await this.restaurantRepository.find();
  }

  //add-items
  async createRestaurantMenuItems(menuItemDto: CreateMenuItemDto) {
    const restaurant = await this.restaurantRepository.findOneBy({ restaurantId: menuItemDto.restaurantId });
    if (!restaurant) {
      throw new BadRequestException('Invalid restaurantId');
    }
    const newMenuItem = this.menuItemRepository.create({ ...menuItemDto, restaurant });
    return this.menuItemRepository.save(newMenuItem);
  }
  //get-restaurant-menu-items
  async getRestaurantMenuItems(restaurantId: string) {
    console.log("service:", restaurantId);
    // const restaurant = await this.restaurantRepository.findOneBy({ restaurantId });
    // if (!restaurant) {
    //   throw new BadRequestException('Invalid restaurantId');
    // }
    return await this.restaurantRepository.find({ where: { restaurantId }, relations: ['menuItems'],
     });
  }
}
