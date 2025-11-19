'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FiHeart, FiMessageSquare, FiShare2, FiMoreHorizontal, FiMusic, FiVideo, FiFileText, FiMoreVertical, FiCamera, FiPlay, FiCopy } from 'react-icons/fi';
import ContentDetailPage from './ContentDetailPage';
import ExploreFilterTabs from './ExploreFilterTabs';
import FeedsContent from './FeedsContent';
import PagesContent from './PagesContent';

// Unsplash photo URLs for posts with different dimensions and orientations
const unsplashPhotos = [
  // Landscape/Wide Images
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=400&auto=format&fit=crop&q=60', // Mountain landscape
  'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&h=350&auto=format&fit=crop&q=60', // Nature wide
  'https://images.unsplash.com/photo-1682687220923-c7a7cf9ece67?w=700&h=300&auto=format&fit=crop&q=60', // Beach sunset wide
  'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=650&h=400&auto=format&fit=crop&q=60', // Sunset field
  
  // Portrait/Tall Images
  'https://images.unsplash.com/photo-1520962880247-cfaf541c8724?w=400&h=600&auto=format&fit=crop&q=60', // Travel portrait
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=350&h=550&auto=format&fit=crop&q=60', // Mountain portrait
  'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400&h=650&auto=format&fit=crop&q=60', // Forest tall
  'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=350&h=600&auto=format&fit=crop&q=60', // Waterfall tall
  
  // Square Images
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=500&h=500&auto=format&fit=crop&q=60', // Sunset square
  'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=450&h=450&auto=format&fit=crop&q=60', // Beach square
  'https://images.unsplash.com/photo-1682687220208-22d7a2543e88?w=500&h=500&auto=format&fit=crop&q=60', // Food square
  'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?w=480&h=480&auto=format&fit=crop&q=60', // Coffee square
  
  // Design/UI Images
  'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&auto=format&fit=crop&q=60', // Design work
  'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=500&h=400&auto=format&fit=crop&q=60', // Tech/coding
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=450&h=350&auto=format&fit=crop&q=60', // Workspace
  'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=600&auto=format&fit=crop&q=60', // Mobile design
  
  // Architecture/Modern
  'https://images.unsplash.com/photo-1682686581854-5e71f58e7e3f?w=350&h=500&auto=format&fit=crop&q=60', // Modern architecture
  'https://images.unsplash.com/photo-1682687982167-d7fb3ed8541d?w=600&h=400&auto=format&fit=crop&q=60', // City street
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=550&auto=format&fit=crop&q=60', // Building tall
  'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=500&h=300&auto=format&fit=crop&q=60', // Architecture wide
  
  // Creative/Art
  'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=500&auto=format&fit=crop&q=60', // Abstract art
  'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=350&h=600&auto=format&fit=crop&q=60', // Creative portrait
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=350&auto=format&fit=crop&q=60', // Art/design
  'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=450&h=450&auto=format&fit=crop&q=60', // Creative square
  
  // Fashion/Lifestyle
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=350&h=550&auto=format&fit=crop&q=60', // Fashion portrait
  'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=600&auto=format&fit=crop&q=60', // Lifestyle tall
  'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&h=400&auto=format&fit=crop&q=60', // Fashion wide
  'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=480&h=480&auto=format&fit=crop&q=60', // Lifestyle square
  
  // Food/Products
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=500&auto=format&fit=crop&q=60', // Food portrait
  'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&h=350&auto=format&fit=crop&q=60', // Food wide
  'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=450&h=450&auto=format&fit=crop&q=60', // Product square
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=350&h=550&auto=format&fit=crop&q=60', // Product tall
  
  // Cars/Automotive
  'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=400&auto=format&fit=crop&q=60', // Sports car wide
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=600&auto=format&fit=crop&q=60', // Classic car portrait
  'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=500&h=500&auto=format&fit=crop&q=60', // Luxury car square
  'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=350&h=550&auto=format&fit=crop&q=60', // Vintage car tall
  'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=650&h=350&auto=format&fit=crop&q=60', // Race car wide
  'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=500&auto=format&fit=crop&q=60', // Modern car portrait
  
  // Festivals/Events
  'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=500&h=400&auto=format&fit=crop&q=60', // Music festival wide
  'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=600&auto=format&fit=crop&q=60', // Concert tall
  'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=450&h=450&auto=format&fit=crop&q=60', // Festival crowd square
  'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=350&h=550&auto=format&fit=crop&q=60', // Stage lights tall
  'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=350&auto=format&fit=crop&q=60', // Festival stage wide
  
  // Cats/Pets
  'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=500&auto=format&fit=crop&q=60', // Cat portrait
  'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=450&h=450&auto=format&fit=crop&q=60', // Cat square
  'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=350&h=550&auto=format&fit=crop&q=60', // Kitten tall
  'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=500&h=350&auto=format&fit=crop&q=60', // Cat wide
  'https://images.unsplash.com/photo-1571566882372-1598d88abd90?w=400&h=600&auto=format&fit=crop&q=60', // Cat eyes portrait
  'https://images.unsplash.com/photo-1548247416-ec66f4900b2e?w=480&h=480&auto=format&fit=crop&q=60', // Cute cat square
  
  // Houses/Architecture
  'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&h=400&auto=format&fit=crop&q=60', // Modern house wide
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=600&auto=format&fit=crop&q=60', // House exterior tall
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=450&h=450&auto=format&fit=crop&q=60', // Cozy house square
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=350&h=550&auto=format&fit=crop&q=60', // Villa tall
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=350&auto=format&fit=crop&q=60', // House landscape wide
  'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=400&h=500&auto=format&fit=crop&q=60',  // Dream house portrait
  
  // More Nature/Landscapes
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&auto=format&fit=crop&q=60', // Mountain sunset
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=600&auto=format&fit=crop&q=60', // Forest path
  'https://images.unsplash.com/photo-1418065460487-3956c3043632?w=600&h=350&auto=format&fit=crop&q=60', // Lake reflection
  'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=450&h=450&auto=format&fit=crop&q=60', // Autumn leaves
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=350&h=550&auto=format&fit=crop&q=60', // Mountain peak
  
  // Urban/City
  'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=400&h=500&auto=format&fit=crop&q=60', // City skyline
  'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&h=400&auto=format&fit=crop&q=60', // City lights
  'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=350&h=600&auto=format&fit=crop&q=60', // Neon signs
  'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=500&h=300&auto=format&fit=crop&q=60', // Modern building
  'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f?w=450&h=450&auto=format&fit=crop&q=60', // Urban street
  
  // Abstract/Art
  'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=500&auto=format&fit=crop&q=60', // Abstract colors
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=350&auto=format&fit=crop&q=60', // Geometric art
  'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=450&h=450&auto=format&fit=crop&q=60', // Color splash
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=350&h=550&auto=format&fit=crop&q=60', // Abstract pattern
  
  // Technology/Modern
  'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=500&h=400&auto=format&fit=crop&q=60', // Tech setup
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=600&auto=format&fit=crop&q=60', // Data visualization
  'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=450&h=450&auto=format&fit=crop&q=60', // Digital interface
  'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=350&h=550&auto=format&fit=crop&q=60', // Security tech
  
  // Ocean/Water
  'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=600&h=400&auto=format&fit=crop&q=60', // Ocean waves
  'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&h=500&auto=format&fit=crop&q=60', // Underwater
  'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=450&h=450&auto=format&fit=crop&q=60', // Beach aerial
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=350&h=550&auto=format&fit=crop&q=60', // Tropical water
  
  // Space/Sky
  'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=500&h=400&auto=format&fit=crop&q=60', // Starry night
  'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=400&h=600&auto=format&fit=crop&q=60', // Galaxy
  'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=450&h=450&auto=format&fit=crop&q=60', // Clouds
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=350&h=550&auto=format&fit=crop&q=60', // Aurora
  
  // Flowers/Plants
  'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=500&auto=format&fit=crop&q=60', // Sunflower
  'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&h=350&auto=format&fit=crop&q=60', // Rose garden
  'https://images.unsplash.com/photo-1464822759844-d150baec0494?w=450&h=450&auto=format&fit=crop&q=60', // Tropical plants
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=350&h=550&auto=format&fit=crop&q=60', // Forest canopy
  
  // Minimalist/Clean
  'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=600&auto=format&fit=crop&q=60', // Clean design
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=400&auto=format&fit=crop&q=60', // Minimal workspace
  'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=450&h=450&auto=format&fit=crop&q=60', // Simple objects
  'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=350&h=550&auto=format&fit=crop&q=60', // Clean lines
  
  // Sports/Fitness
  'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=400&auto=format&fit=crop&q=60', // Gym workout
  'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=600&auto=format&fit=crop&q=60', // Running
  'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=450&h=450&auto=format&fit=crop&q=60', // Yoga
  'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=350&h=550&auto=format&fit=crop&q=60', // Cycling
  'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&h=350&auto=format&fit=crop&q=60', // Basketball
  
  // Coffee/Cafe
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=500&auto=format&fit=crop&q=60', // Coffee cup
  'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&h=350&auto=format&fit=crop&q=60', // Cafe interior
  'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=450&h=450&auto=format&fit=crop&q=60', // Latte art
  'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=350&h=550&auto=format&fit=crop&q=60', // Coffee beans
  
  // Books/Reading
  'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&auto=format&fit=crop&q=60', // Book stack
  'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&h=400&auto=format&fit=crop&q=60', // Library
  'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=450&h=450&auto=format&fit=crop&q=60', // Open book
  'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=350&h=550&auto=format&fit=crop&q=60', // Reading corner
  
  // Travel/Adventure
  'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=400&auto=format&fit=crop&q=60', // Travel map
  'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=600&auto=format&fit=crop&q=60', // Airplane wing
  'https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=450&h=450&auto=format&fit=crop&q=60', // Passport
  'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=350&h=550&auto=format&fit=crop&q=60', // Backpack
  
  // Watches/Accessories
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=500&auto=format&fit=crop&q=60', // Watch close-up
  'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&h=350&auto=format&fit=crop&q=60', // Sunglasses
  'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=450&h=450&auto=format&fit=crop&q=60', // Jewelry
  'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=350&h=550&auto=format&fit=crop&q=60', // Accessories
  
  // Gaming/Entertainment
  'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&h=400&auto=format&fit=crop&q=60', // Gaming setup
  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=600&auto=format&fit=crop&q=60', // Controller
  'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=450&h=450&auto=format&fit=crop&q=60', // Gaming room
  'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=350&h=550&auto=format&fit=crop&q=60', // Headphones
  
  // Workspace/Office
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&h=400&auto=format&fit=crop&q=60', // Office desk
  'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&h=600&auto=format&fit=crop&q=60', // Modern office
  'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=450&h=450&auto=format&fit=crop&q=60', // Laptop work
  'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=350&h=550&auto=format&fit=crop&q=60', // Team meeting
  
  // Drinks/Beverages
  'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=500&auto=format&fit=crop&q=60', // Cocktail
  'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&h=350&auto=format&fit=crop&q=60', // Smoothie
  'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=450&h=450&auto=format&fit=crop&q=60', // Tea time
  'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=350&h=550&auto=format&fit=crop&q=60', // Wine glass
  
  // Desserts/Sweets
  'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=600&auto=format&fit=crop&q=60', // Cake
  'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500&h=400&auto=format&fit=crop&q=60', // Donuts
  'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=450&h=450&auto=format&fit=crop&q=60', // Ice cream
  'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=350&h=550&auto=format&fit=crop&q=60', // Cupcakes
  
  // Vintage/Retro
  'https://images.unsplash.com/photo-1485579149621-3123dd979885?w=600&h=400&auto=format&fit=crop&q=60', // Vintage camera
  'https://images.unsplash.com/photo-1493612276216-ee3925520721?w=400&h=600&auto=format&fit=crop&q=60', // Record player
  'https://images.unsplash.com/photo-1519558260268-cde7e03a0152?w=450&h=450&auto=format&fit=crop&q=60', // Vintage radio
  'https://images.unsplash.com/photo-1487147264018-f937fba0c817?w=350&h=550&auto=format&fit=crop&q=60', // Retro items
  
  // Mountains/Hiking
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500&h=400&auto=format&fit=crop&q=60', // Mountain peak
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&auto=format&fit=crop&q=60', // Hiking trail
  'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=450&h=450&auto=format&fit=crop&q=60', // Mountain lake
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=350&h=550&auto=format&fit=crop&q=60'  // Alpine view
];

// Unsplash profile photos for avatars
const unsplashProfiles = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=60', // Woman profile
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60', // Man profile
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=60', // Woman profile 2
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=60', // Man profile 2
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=60', // Woman profile 3
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=60', // Man profile 3
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=60', // Woman profile 4
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=60', // Man profile 4
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=60', // Woman profile 5
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=60', // Man profile 5
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop&q=60', // Woman profile 6
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60'  // Man profile 6
];

// Sample usernames
const usernames = [
  'john_doe', 'travel_lover', 'photo_enthusiast', 'nature_explorer',
  'city_wanderer', 'food_critic', 'art_admirer', 'music_fan',
  'adventure_seeker', 'sunset_chaser', 'urban_photographer', 'coffee_addict'
];

// Sample post captions without hashtags
const captions = [
  'Exploring new places',
  'The view was worth the climb',
  'Lost in the moment',
  'City lights and urban nights',
  'Delicious finds in hidden corners',
  'Music that speaks to the soul',
  'Art is everywhere if you look closely',
  'Morning coffee and good vibes',
  'Weekend getaway to recharge',
  'Architecture that tells stories',
  'Creative process in action',
  'Modern minimalism at its finest',
  'Fashion forward thinking',
  'Workspace goals achieved',
  'Abstract thoughts visualized',
  'Street photography magic',
  'Product design perfection',
  'Branding that speaks volumes',
  'Typography in the wild',
  'Color palette inspiration',
  'Geometric patterns everywhere',
  'Vintage meets modern',
  'Sustainable design matters',
  'Digital art exploration',
  'Motion graphics in progress',
  'Festival vibes and energy',
  'Cute moments captured',
  'Home sweet home',
  'Dream car collection',
  'Perfect weekend drive'
];

// Post types
type PostType = 'photo' | 'photos' | 'video' | 'short_video' | 'music' | 'article';

// Post interface
interface Post {
  id: string;
  username: string;
  avatar: string;
  image: string;
  caption: string;
  likes: number;
  comments: number;
  shares: number;
  time: string;
  type: PostType;
  title?: string; // For articles and music
  duration?: string; // For videos and music
  source?: string; // For articles
  height: number; // For masonry layout
  aspectRatio: 'square' | 'portrait' | 'landscape' | 'tall' | 'wide'; // Different aspect ratios
  platform?: string; // For social media platforms
  videoId?: string; // For video platforms
}

// Social media content from FeedsContent
const socialMediaContent = [
  // YouTube Videos (Long videos - wide aspect ratio)
  {
    id: 'youtube-1',
    username: 'tech_reviewer',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=60',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&auto=format&fit=crop&q=60',
    caption: '🎥 Amazing Tech Review!',
    likes: 15234,
    comments: 892,
    shares: 2341,
    time: '1 hour ago',
    type: 'video' as PostType,
    height: 180,
    aspectRatio: 'wide' as const,
    duration: '8:45',
    videoId: 'iDqSKfIQ-q4',
    platform: 'youtube'
  },
  {
    id: 'youtube-2',
    username: 'music_lover',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=60',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&auto=format&fit=crop&q=60',
    caption: '🎵 Epic Music Video!',
    likes: 23456,
    comments: 1234,
    shares: 3456,
    time: '2 hours ago',
    type: 'video' as PostType,
    height: 180,
    aspectRatio: 'wide' as const,
    duration: '4:32',
    videoId: 'nb_fFj_0rq8',
    platform: 'youtube'
  },
  
  // YouTube Shorts (Short videos - tall aspect ratio)
  {
    id: 'youtube-short-1',
    username: 'trending_shorts',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=60',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&auto=format&fit=crop&q=60',
    caption: '🔥 Trending Short!',
    likes: 45678,
    comments: 2341,
    shares: 5678,
    time: '30 minutes ago',
    type: 'short_video' as PostType,
    height: 450,
    aspectRatio: 'tall' as const,
    duration: '0:45',
    videoId: 'mWbxOjykArw',
    platform: 'youtube'
  },
  {
    id: 'youtube-short-2',
    username: 'dance_vibes',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=60',
    image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&auto=format&fit=crop&q=60',
    caption: '💃 Smooth Moves!',
    likes: 52341,
    comments: 2987,
    shares: 6543,
    time: '2 hours ago',
    type: 'short_video' as PostType,
    height: 450,
    aspectRatio: 'tall' as const,
    duration: '0:58',
    videoId: 'QWpDDHw0PMc',
    platform: 'youtube'
  },

  // Vimeo Videos (Professional content - wide aspect ratio)
  {
    id: 'vimeo-1',
    username: 'creative_pro',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=60',
    image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&auto=format&fit=crop&q=60',
    caption: '🎬 Professional Video Production',
    likes: 8934,
    comments: 456,
    shares: 1234,
    time: '3 hours ago',
    type: 'video' as PostType,
    height: 180,
    aspectRatio: 'wide' as const,
    duration: '6:12',
    videoId: '347119375',
    platform: 'vimeo'
  },
  {
    id: 'vimeo-2',
    username: 'motion_designer',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=60',
    image: 'https://images.unsplash.com/photo-1574267432644-f610f5b7e4d1?w=800&auto=format&fit=crop&q=60',
    caption: '⚡ Motion Graphics Demo',
    likes: 15678,
    comments: 923,
    shares: 3456,
    time: '6 hours ago',
    type: 'video' as PostType,
    height: 180,
    aspectRatio: 'wide' as const,
    duration: '3:45',
    videoId: '897818060',
    platform: 'vimeo'
  },

  // Dailymotion Videos (Wide aspect ratio)
  {
    id: 'dailymotion-1',
    username: 'dailymotion_pro',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=60',
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&auto=format&fit=crop&q=60',
    caption: '🎬 Amazing Dailymotion Content!',
    likes: 7892,
    comments: 345,
    shares: 1123,
    time: '2 hours ago',
    type: 'video' as PostType,
    height: 180,
    aspectRatio: 'wide' as const,
    duration: '5:23',
    videoId: 'x9fo68m',
    platform: 'dailymotion'
  },
  {
    id: 'dailymotion-2',
    username: 'cinema_francais',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=60',
    image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&auto=format&fit=crop&q=60',
    caption: '🎬 French Cinema Excellence',
    likes: 15678,
    comments: 892,
    shares: 3456,
    time: '6 hours ago',
    type: 'video' as PostType,
    height: 180,
    aspectRatio: 'wide' as const,
    duration: '7:18',
    videoId: 'x9oafl0',
    platform: 'dailymotion'
  },

  // Rutube Shorts (Portrait aspect ratio)
  {
    id: 'rutube-short-1',
    username: 'rutubeshorts',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=60',
    image: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=400&auto=format&fit=crop&q=60',
    caption: '🎬 Amazing Rutube Short!',
    likes: 38456,
    comments: 723,
    shares: 1012,
    time: '4 days ago',
    type: 'short_video' as PostType,
    height: 420,
    aspectRatio: 'tall' as const,
    duration: '0:52',
    videoId: 'f1e0d8d0b4a3f02601317691df089f37',
    platform: 'rutube'
  },
  {
    id: 'rutube-short-2',
    username: 'rutubeviral',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=60',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&auto=format&fit=crop&q=60',
    caption: '🔥 Viral Short!',
    likes: 67890,
    comments: 1234,
    shares: 2345,
    time: '5 days ago',
    type: 'short_video' as PostType,
    height: 420,
    aspectRatio: 'tall' as const,
    duration: '0:38',
    videoId: '051066708b2e900f8e1de8765c300387',
    platform: 'rutube'
  },

  // VK Videos (Landscape aspect ratio)
  {
    id: 'vk-video-1',
    username: 'vkcreator',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=60',
    image: 'https://images.unsplash.com/photo-1574267432644-f610f5b7e4d1?w=800&auto=format&fit=crop&q=60',
    caption: '🎬 Amazing VK Video!',
    likes: 34567,
    comments: 678,
    shares: 890,
    time: '20 hours ago',
    type: 'video' as PostType,
    height: 200,
    aspectRatio: 'landscape' as const,
    duration: '4:15',
    videoId: '-59336195_456239378',
    platform: 'vk'
  },
  {
    id: 'vk-video-2',
    username: 'vktrending',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=60',
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&auto=format&fit=crop&q=60',
    caption: '🔥 Trending Now!',
    likes: 63789,
    comments: 1234,
    shares: 2345,
    time: '1 day ago',
    type: 'video' as PostType,
    height: 200,
    aspectRatio: 'landscape' as const,
    duration: '3:42',
    videoId: '-222693769_456239541',
    platform: 'vk'
  },

  // Bilibili Videos (Wide aspect ratio)
  {
    id: 'bilibili-1',
    username: 'bilibilicreator',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=60',
    image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&auto=format&fit=crop&q=60',
    caption: '🎬 Amazing Bilibili Video!',
    likes: 56789,
    comments: 1234,
    shares: 2345,
    time: '1 day ago',
    type: 'video' as PostType,
    height: 180,
    aspectRatio: 'wide' as const,
    duration: '6:30',
    videoId: 'BV1bzCcBoE26',
    platform: 'bilibili'
  },

  // Instagram Reels (Portrait aspect ratio)
  {
    id: 'instagram-reel-1',
    username: 'travelexplorer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&auto=format&fit=crop&q=60',
    caption: '🌴 Paradise Found!',
    likes: 67890,
    comments: 1345,
    shares: 2134,
    time: '19 hours ago',
    type: 'short_video' as PostType,
    height: 400,
    aspectRatio: 'portrait' as const,
    duration: '0:30',
    videoId: 'C4FvChHvcqi',
    platform: 'instagram'
  },

  // Regular Photos (Various aspect ratios)
  {
    id: 'photo-1',
    username: 'photo_pro',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=60',
    image: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=800&h=1200&auto=format&fit=crop&q=60',
    caption: '🏔️ Aurora Borealis over Icelandic Mountains',
    likes: 12456,
    comments: 234,
    shares: 567,
    time: '5 hours ago',
    type: 'photo' as PostType,
    height: 380,
    aspectRatio: 'tall' as const
  },
  {
    id: 'photo-2',
    username: 'city_lights',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=60',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1400&h=700&auto=format&fit=crop&q=60',
    caption: '🌃 Manhattan Skyline at Dusk',
    likes: 8765,
    comments: 123,
    shares: 345,
    time: '8 hours ago',
    type: 'photo' as PostType,
    height: 160,
    aspectRatio: 'wide' as const
  },
  {
    id: 'photo-3',
    username: 'travel_diaries',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=60',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&h=1200&auto=format&fit=crop&q=60',
    caption: '🇬🇷 Sunset in Santorini',
    likes: 15432,
    comments: 456,
    shares: 789,
    time: '12 hours ago',
    type: 'photo' as PostType,
    height: 380,
    aspectRatio: 'tall' as const
  }
];

// Generate posts with mixed social media content
const generatePosts = (): Post[] => {
  const postTypes: PostType[] = ['photo', 'photos', 'video', 'short_video', 'music', 'article'];
  const timeAgo = ['Just now', '5m ago', '10m ago', '15m ago', '30m ago', '1h ago', '2h ago', '3h ago', 'Yesterday', '2d ago'];
  
  const regularPosts = Array.from({ length: 80 }, (_, i) => {
    const type = postTypes[i % 6];
    const randomUsername = usernames[Math.floor(Math.random() * usernames.length)];
    const randomCaption = captions[Math.floor(Math.random() * captions.length)];
    const randomLikes = Math.floor(Math.random() * 50000) + 100;
    const randomComments = Math.floor(Math.random() * 1000) + 10;
    const randomShares = Math.floor(Math.random() * 500) + 5;
    
    // Define different aspect ratios with corresponding heights
    const aspectRatios: Array<{ratio: 'square' | 'portrait' | 'landscape' | 'tall' | 'wide', height: number}> = [
      { ratio: 'square', height: 250 },      // 1:1 ratio
      { ratio: 'portrait', height: 320 },    // 3:4 ratio
      { ratio: 'landscape', height: 200 },   // 4:3 ratio
      { ratio: 'tall', height: 400 },        // 2:3 ratio (tall)
      { ratio: 'wide', height: 160 },        // 16:9 ratio (wide)
    ];
    
    const selectedAspect = aspectRatios[Math.floor(Math.random() * aspectRatios.length)];
    
    const post: Post = {
      id: `post-${i + 1}`,
      username: randomUsername,
      avatar: unsplashProfiles[i % unsplashProfiles.length],
      image: unsplashPhotos[i % unsplashPhotos.length],
      caption: randomCaption,
      likes: randomLikes,
      comments: randomComments,
      shares: randomShares,
      time: timeAgo[i % timeAgo.length],
      type: type,
      height: selectedAspect.height + Math.floor(Math.random() * 50), // Add some variation
      aspectRatio: selectedAspect.ratio
    };
    
    // Add type-specific properties
    if (type === 'video') {
      // Long videos (1-10 minutes)
      post.duration = `${Math.floor(Math.random() * 10) + 1}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`;
    } else if (type === 'short_video') {
      // Short videos (15-60 seconds)
      post.duration = `0:${Math.floor(Math.random() * 46) + 15}`;
    } else if (type === 'music') {
      post.title = `Track ${i + 1} - ${randomUsername}'s Playlist`;
    } else if (type === 'article') {
      post.title = `${randomCaption.split(' ').slice(0, 3).join(' ')}...`;
      post.source = `${randomUsername}.blog`;
    }
    
    return post;
  });

  // Mix social media content with regular posts randomly
  const allPosts = [...regularPosts, ...socialMediaContent];
  
  // Shuffle the array to mix content randomly
  for (let i = allPosts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allPosts[i], allPosts[j]] = [allPosts[j], allPosts[i]];
  }
  
  return allPosts;
};

interface ExploreFeedProps {
  activeFilter?: string;
  onFilterChange?: (filterId: string) => void;
}

export default function ExploreFeed({ activeFilter: externalFilter, onFilterChange: externalOnFilterChange }: ExploreFeedProps = {}) {
  const [posts, setPosts] = useState<Post[]>(generatePosts());
  const [internalFilter, setInternalFilter] = useState('explore');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [showDetailPage, setShowDetailPage] = useState(false);
  
  const activeFilter = externalFilter || internalFilter;
  const handleFilterChange = externalOnFilterChange || setInternalFilter;
  
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
    setShowDetailPage(true);
  };

  const handleBackFromDetail = () => {
    setShowDetailPage(false);
    setSelectedPost(null);
  };

  const handleUserClick = (username: string) => {
    // Handle user profile navigation
    console.log('Navigate to user profile:', username);
  };

  const renderContent = () => {
    switch (activeFilter) {
      case 'all':
        return <FeedsContent />;
      case 'pages':
        return <PagesContent />;
      case 'explore':
      default:
        return (
          <div className="posts-container overflow-auto flex-1 bg-gray-50">
            <div className="w-full py-4">
              <div className="max-w-7xl mx-auto px-4">
                <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4">
                  {posts.map((post) => (
                    <PinterestCard key={post.id} post={post} formatNumber={formatNumber} onPostClick={handlePostClick} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
    }
  };
  
  // Show detail page if a post is selected
  if (showDetailPage && selectedPost) {
    return (
      <ContentDetailPage 
        post={selectedPost}
        onBack={handleBackFromDetail}
        onUserClick={handleUserClick}
      />
    );
  }

  return (
    <div className="explore-feed h-full flex flex-col bg-gray-50">
      <ExploreFilterTabs 
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
      />
      {renderContent()}
    </div>
  );
}

// Pinterest Card Component
function PinterestCard({ post, formatNumber, onPostClick }: { post: Post, formatNumber: (num: number) => string, onPostClick?: (post: Post) => void }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="pinterest-card bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer mb-4 break-inside-avoid"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onPostClick?.(post)}
    >
      {/* Image/Video Container */}
      <div className="relative group">
        <div style={{ height: `${post.height}px` }} className="relative overflow-hidden">
          {/* Render actual video players for social media content */}
          {(post as any).platform === 'youtube' && (post.type === 'video' || post.type === 'short_video') ? (
            <iframe
              src={`https://www.youtube.com/embed/${(post as any).videoId}?autoplay=0&rel=0&modestbranding=1`}
              title="YouTube video player"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full"
              style={{ border: 'none' }}
            />
          ) : (post as any).platform === 'vimeo' && (post.type === 'video') ? (
            <iframe
              src={`https://player.vimeo.com/video/${(post as any).videoId}?autoplay=0&muted=0`}
              frameBorder="0"
              allowFullScreen
              allow="autoplay; fullscreen; picture-in-picture"
              title="Vimeo Video"
              className="w-full h-full"
              style={{ border: 'none' }}
            />
          ) : (post as any).platform === 'dailymotion' && (post.type === 'video') ? (
            <iframe
              src={`https://www.dailymotion.com/embed/video/${(post as any).videoId}?autoplay=0&mute=1`}
              frameBorder="0"
              allowFullScreen
              allow="fullscreen; picture-in-picture"
              title="Dailymotion Video"
              className="w-full h-full"
              style={{ border: 'none' }}
            />
          ) : (post as any).platform === 'rutube' && (post.type === 'short_video') ? (
            <iframe
              src={`https://rutube.ru/play/embed/${(post as any).videoId}?autoplay=0`}
              frameBorder="0"
              allowFullScreen
              allow="clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              title="Rutube Short"
              className="w-full h-full"
              style={{ border: 'none' }}
            />
          ) : (post as any).platform === 'vk' && (post.type === 'video') ? (
            <iframe
              src={`https://vk.com/video_ext.php?oid=${(post as any).videoId.split('_')[0]}&id=${(post as any).videoId.split('_')[1]}&hd=2&autoplay=0`}
              frameBorder="0"
              allowFullScreen
              allow="clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              title="VK Video"
              className="w-full h-full"
              style={{ border: 'none' }}
            />
          ) : (post as any).platform === 'bilibili' && (post.type === 'video') ? (
            <iframe
              src={`https://player.bilibili.com/player.html?bvid=${(post as any).videoId}&autoplay=0&muted=1`}
              scrolling="no"
              frameBorder="0"
              allowFullScreen
              title="Bilibili Video"
              className="w-full h-full"
              style={{ border: 'none' }}
            />
          ) : (post as any).platform === 'instagram' && (post.type === 'short_video') ? (
            <div 
              className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center cursor-pointer hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
              onClick={() => window.open(`https://www.instagram.com/reel/${(post as any).videoId}/`, '_blank')}
            >
              <div className="text-center text-white">
                <svg className="w-12 h-12 mx-auto mb-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <p className="text-sm font-semibold">Instagram Reel</p>
                <p className="text-xs opacity-75">Click to view on Instagram</p>
              </div>
            </div>
          ) : (
            // Default image for regular posts and fallback
            <>
              <Image 
                src={post.image} 
                alt={post.caption} 
                fill 
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              
              {/* Play button overlay for videos */}
              {(post.type === 'video' || post.type === 'short_video') && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-black bg-opacity-70 rounded-full flex items-center justify-center hover:bg-opacity-90 transition-all duration-300">
                    <FiPlay size={24} className="text-white ml-1" />
                  </div>
                </div>
              )}
            </>
          )}
          
          {/* Hover Overlay */}
          <div className={`absolute inset-0 bg-black bg-opacity-20 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'} pointer-events-none`}>
            {/* Top Actions - Three Dot Menu */}
            <div className="absolute top-3 right-3 pointer-events-auto">
              <button 
                className="p-2 rounded-full bg-white bg-opacity-90 shadow-md hover:scale-110 transition-all duration-200 text-gray-700"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <FiMoreVertical size={16} />
              </button>
            </div>
          </div>

          {/* Type Indicator */}
          {post.type !== 'photo' && (
            <div className="absolute top-3 left-3 bg-black bg-opacity-75 text-white rounded-lg px-2 py-1 flex items-center text-xs">
              {post.type === 'video' && (
                <>
                  <FiVideo size={12} className="mr-1" />
                  <span>{post.duration}</span>
                </>
              )}
              {post.type === 'short_video' && (
                <>
                  <FiPlay size={12} className="mr-1" />
                  <span>{post.duration}</span>
                </>
              )}
              {post.type === 'music' && (
                <>
                  <FiMusic size={12} />
                </>
              )}
              {post.type === 'photos' && (
                <>
                  <FiCopy size={12} className="mr-1" />
                  <span>1/{Math.floor(Math.random() * 5) + 2}</span>
                </>
              )}
              {post.type === 'article' && (
                <>
                  <FiFileText size={12} className="mr-1" />
                  <span>Article</span>
                </>
              )}
            </div>
          )}

          {/* Platform Badge for Social Media Content */}
          {(post as any).platform && (
            <div className={`absolute bottom-3 right-3 px-2 py-1 rounded-full flex items-center text-xs font-bold shadow-lg ${
              (post as any).platform === 'youtube' ? 'bg-red-600 text-white' :
              (post as any).platform === 'vimeo' ? 'bg-blue-500 text-white' :
              (post as any).platform === 'dailymotion' ? 'bg-white text-black' :
              (post as any).platform === 'rutube' ? 'bg-gradient-to-r from-blue-900 to-red-500 text-white' :
              (post as any).platform === 'vk' ? 'bg-blue-500 text-white' :
              (post as any).platform === 'bilibili' ? 'bg-gradient-to-r from-blue-300 via-blue-500 to-blue-700 text-white' :
              (post as any).platform === 'instagram' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' :
              'bg-gray-600 text-white'
            }`}>
              {(post as any).platform === 'youtube' && (
                <>
                  <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  <span>YT</span>
                </>
              )}
              {(post as any).platform === 'vimeo' && (
                <>
                  <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.977 6.416c-.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.37-8.29 6.37-1.409 0-2.578-1.294-3.553-3.881L5.322 11.4C4.603 8.816 3.834 7.522 3.01 7.522c-.179 0-.806.378-1.881 1.132L0 7.197c1.185-1.044 2.351-2.084 3.501-3.128C5.08 2.701 6.266 1.984 7.055 1.91c1.867-.18 3.016 1.1 3.447 3.838.465 2.953.789 4.789.971 5.507.539 2.45 1.131 3.674 1.776 3.674.502 0 1.256-.796 2.265-2.385 1.004-1.589 1.54-2.797 1.612-3.628.144-1.371-.395-2.061-1.614-2.061-.574 0-1.167.121-1.777.391 1.186-3.868 3.434-5.757 6.762-5.637 2.473.06 3.628 1.664 3.493 4.797l-.013.01z"/>
                  </svg>
                  <span>VM</span>
                </>
              )}
              {(post as any).platform === 'dailymotion' && (
                <>
                  <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13.551 11.485c-1.02 0-1.734.714-1.734 1.734s.714 1.734 1.734 1.734 1.734-.714 1.734-1.734-.714-1.734-1.734-1.734zM24 4.571v14.857C24 21.714 22.286 24 20 24H4c-2.286 0-4-2.286-4-4V4c0-2.286 1.714-4 4-4h16c2.286 0 4 1.714 4 4v.571zM9.143 12c0-2.571 2.286-4.571 4.857-4.571S18.857 9.429 18.857 12s-2.286 4.571-4.857 4.571S9.143 14.571 9.143 12z"/>
                  </svg>
                  <span>DM</span>
                </>
              )}
              {(post as any).platform === 'rutube' && (
                <>
                  <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                  </svg>
                  <span>RT</span>
                </>
              )}
              {(post as any).platform === 'vk' && (
                <>
                  <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.78 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.49-.085.744-.576.744z"/>
                  </svg>
                  <span>VK</span>
                </>
              )}
              {(post as any).platform === 'bilibili' && (
                <>
                  <img 
                    src="https://img.utdstc.com/icon/ba9/33d/ba933d0e003c9f53e0fb3de2b0f1a8def6898ce2384850ca3adb1cc332d78241:200" 
                    alt="Bilibili" 
                    className="w-3 h-3 mr-1 rounded-sm"
                  />
                  <span>BL</span>
                </>
              )}
              {(post as any).platform === 'instagram' && (
                <>
                  <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span>IG</span>
                </>
              )}
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
}

// Post Card Component
function PostCard({ post, formatNumber }: { post: Post, formatNumber: (num: number) => string }) {
  const [liked, setLiked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const handleLike = () => {
    setLiked(!liked);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  return (
    <div className="post-card bg-white mb-4 shadow-sm rounded-xl overflow-hidden">
      {/* Post Header */}
      <div className="post-header flex items-center p-3">
        <div className="avatar-container mr-2">
          <div className="rounded-full overflow-hidden" style={{ width: '40px', height: '40px' }}>
            <Image 
              src={post.avatar} 
              alt={post.username} 
              width={40} 
              height={40} 
              className="object-cover"
            />
          </div>
        </div>
        <div className="flex-grow">
          <p className="mb-0 font-medium">{post.username}</p>
          <p className="mb-0 text-gray-500 text-sm">{post.time}</p>
        </div>
        <button className="btn-icon">
          <FiMoreHorizontal size={20} />
        </button>
      </div>
      
      {/* Post Content */}
      <div className="post-content relative">
        {/* Media Container */}
        <div style={{ width: '100%', height: '630px', position: 'relative' }}>
          <Image 
            src={post.image} 
            alt={post.caption} 
            fill 
            className="object-fit-cover"
          />
          
          {/* Overlay for Video/Music */}
          {(post.type === 'video' || post.type === 'short_video' || post.type === 'music') && (
            <div 
              className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
              style={{ background: 'rgba(0,0,0,0.3)', cursor: 'pointer' }}
              onClick={handlePlayPause}
            >
              {(post.type === 'video' || post.type === 'short_video') && (
                <div className="text-white">
                  {isPlaying ? (
                    <div className="p-4 rounded-full bg-black bg-opacity-50">
                      {post.type === 'video' ? <FiVideo size={40} /> : <FiPlay size={40} />}
                    </div>
                  ) : (
                    <div className="p-4 rounded-full bg-black bg-opacity-50">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </div>
                  )}
                </div>
              )}
              {post.type === 'music' && (
                <div className="text-white">
                  {isPlaying ? (
                    <div className="p-4 rounded-full bg-black bg-opacity-50">
                      <FiMusic size={40} />
                    </div>
                  ) : (
                    <div className="p-4 rounded-full bg-black bg-opacity-50">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Type Indicator */}
          {post.type !== 'photo' && (
            <div className="post-type-indicator absolute top-0 right-0 m-3 bg-black bg-opacity-75 text-white rounded-full px-3 py-2 flex items-center">
              {post.type === 'video' && (
                <>
                  <FiVideo size={16} className="mr-2" />
                  <span>{post.duration}</span>
                </>
              )}
              {post.type === 'short_video' && (
                <>
                  <FiPlay size={16} className="mr-2" />
                  <span>{post.duration}</span>
                </>
              )}
              {post.type === 'music' && (
                <>
                  <FiMusic size={16} />
                </>
              )}
              {post.type === 'photos' && (
                <>
                  <FiCopy size={16} className="mr-2" />
                  <span>1/{Math.floor(Math.random() * 5) + 2}</span>
                </>
              )}
              {post.type === 'article' && (
                <>
                  <FiFileText size={16} className="mr-2" />
                  <span>Article</span>
                </>
              )}
            </div>
          )}
        </div>

        {/* Title for Music and Article */}
        {(post.type === 'music' || post.type === 'article') && post.title && (
          <div className="p-3 border-b border-gray-200">
            <h6 className="mb-0 font-bold">{post.title}</h6>
            {post.type === 'article' && post.source && (
              <p className="mb-0 text-gray-500 text-sm">Source: {post.source}</p>
            )}
          </div>
        )}
      </div>
      
      {/* Post Actions */}
      <div className="post-actions flex p-3 border-b border-gray-200">
        <div className="flex gap-3">
          <button 
            className={`btn-icon ${liked ? 'text-red-500' : ''}`}
            onClick={handleLike}
          >
            <FiHeart size={24} className={liked ? 'filled-heart' : ''} />
          </button>
          <button className="btn-icon">
            <FiMessageSquare size={24} />
          </button>
          <button className="btn-icon">
            <FiShare2 size={24} />
          </button>
        </div>
      </div>
      
      {/* Post Stats */}
      <div className="post-stats p-3">
        <p className="mb-2 font-medium">{formatNumber(post.likes)} likes</p>
        <p className="mb-2 truncate">
          <span className="font-medium">{post.username}</span> {post.caption}
        </p>
        <p className="mb-0 text-gray-500 text-sm">
          View all {formatNumber(post.comments)} comments
        </p>
      </div>
    </div>
  );
}