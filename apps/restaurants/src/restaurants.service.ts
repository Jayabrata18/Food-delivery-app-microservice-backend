import { UpdateMenuItemDto } from '@app/common';
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
    const restaurant = await this.restaurantRepository.findOne({
      where: { restaurantId },
      relations: ['menuItems'],
    });
    if (!restaurant) {
      throw new BadRequestException('Invalid restaurantId');
    } else {
      return restaurant.menuItems;
    }

  }
  //update-restaurant-menu-items
  async updateRestaurantMenuItems(restaurantId: string, menuItemDto: UpdateMenuItemDto) {
    const restaurant = await this.restaurantRepository.findOne({
      where: { restaurantId },
      relations: ['menuItems'],
    });
    if (!restaurant) {
      throw new BadRequestException('Invalid restaurantId');
    }
    const menuItem = restaurant.menuItems.find((item) => item.id === Number(menuItemDto.menuItemId));
    if (!menuItem) {
      throw new BadRequestException('Invalid menuItemId');
    }
    Object.assign(menuItem, menuItemDto);
    return await this.menuItemRepository.save(menuItem);
    
  }
}
