import { CreateRestaurantDto } from '@app/common/dtos/create-restaurant.dto';
import { Restaurant } from '@app/common/entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RestaurantsMicroserviceService {
  constructor(@InjectRepository(Restaurant) private readonly restaurantRepository: Repository<Restaurant>) { }

  createRestaurant(restaurantDto: CreateRestaurantDto) {
    const newRestaurant = this.restaurantRepository.create(restaurantDto);
    return this.restaurantRepository.save(newRestaurant);
  }
  //add-items
  createRestaurantMenuItems(restaurantDto: CreateRestaurantDto) {
    const newRestaurant = this.restaurantRepository.create(restaurantDto);
    return this.restaurantRepository.save(newRestaurant);
  }
}
