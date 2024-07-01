import { UpdateMenuItemDto } from '@app/common';
import { CreateRestaurantDto } from '@app/common/dtos/restaurants/create-restaurant.dto';
import { CreateMenuItemDto } from '@app/common/dtos/restaurants/menu/menuItems.dto';
import { Restaurant } from '@app/common/entity';
import { MenuItems } from '@app/common/entity/restaurant/menuItems.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Like, Repository } from 'typeorm';

@Injectable()
export class RestaurantsMicroserviceService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
    @InjectRepository(MenuItems)
    private readonly menuItemRepository: Repository<MenuItems>,
  ) { }

  //create-restaurant
  createRestaurant(restaurantDto: CreateRestaurantDto) {
    const newRestaurant = this.restaurantRepository.create(restaurantDto);
    return this.restaurantRepository.save(newRestaurant);
  }
  //get all-restaurants
  async getAllRestaurants(): Promise<{
    restaurants: Restaurant[];
    count: number;
  }> {
    const [restaurants, count] = await this.restaurantRepository.findAndCount();
    return { restaurants, count };
  }
  //get-restaurant-by-id
  async getRestaurantById(restaurantId: string) {
    return await this.restaurantRepository.findOne({ where: { restaurantId } });
  }
  //update-restaurant-by-id
  async updateRestaurantById(
    restaurantId: string,
    restaurantDto: CreateRestaurantDto,
  ) {
    const restaurant = await this.restaurantRepository.findOne({
      where: { restaurantId },
    });
    if (!restaurant) {
      throw new BadRequestException('Invalid restaurantId');
    }
    Object.assign(restaurant, restaurantDto);
    return await this.restaurantRepository.save(restaurant);
  }
  //delete-restaurant-by-id
  async deleteRestaurantById(restaurantId: string) {
    const restaurant = await this.restaurantRepository.findOne({
      where: { restaurantId },
    });
    if (!restaurant) {
      throw new BadRequestException('Invalid restaurantId');
    }
    return await this.restaurantRepository.remove(restaurant);
  }

  //add-items
  async createRestaurantMenuItems(menuItemDto: CreateMenuItemDto) {
    const restaurant = await this.restaurantRepository.findOneBy({
      restaurantId: menuItemDto.restaurantId,
    });
    if (!restaurant) {
      throw new BadRequestException('Invalid restaurantId');
    }
    const newMenuItem = this.menuItemRepository.create({
      ...menuItemDto,
      restaurant,
    });
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
  async updateRestaurantMenuItems(
    restaurantId: string,
    menuItemDto: UpdateMenuItemDto,
  ) {
    const restaurant = await this.restaurantRepository.findOne({
      where: { restaurantId },
      relations: ['menuItems'],
    });
    if (!restaurant) {
      throw new BadRequestException('Invalid restaurantId');
    }
    const menuItem = restaurant.menuItems.find(
      (item) => item.id === Number(menuItemDto.menuItemId),
    );
    if (!menuItem) {
      throw new BadRequestException('Invalid menuItemId');
    }
    Object.assign(menuItem, menuItemDto);
    return await this.menuItemRepository.save(menuItem);
  }

  //find-restaurants-service

  // Find restaurants by pincode within a 5-pincode radius
  async findRestaurantsByPincode(pincode: number) {
    const radius = 5;
    const startPincode = pincode - radius;
    const endPincode = pincode + radius;

    return await this.restaurantRepository.find({
      where: { pincode: Between(startPincode, endPincode) },
    });
  }
  // Find restaurants by name
  async findRestaurantsByName(name: string) {
    return await this.restaurantRepository.find({
      where: { restaurantName: Like(`%${name}%`) },
    });
  }
  // Find restaurants by menu item
  async findRestaurantsByMenuItem(menuItem: string) {
    return await this.menuItemRepository.find({
      where: { menuItemName: Like(`%${menuItem}%`) },
    });
  }
}
