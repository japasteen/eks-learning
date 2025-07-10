import { users, rooms, bookings, contacts, type User, type InsertUser, type Room, type InsertRoom, type Booking, type InsertBooking, type Contact, type InsertContact, type AvailabilityCheck } from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Room methods
  getAllRooms(): Promise<Room[]>;
  getRoom(id: number): Promise<Room | undefined>;
  getRoomsByCategory(category: string): Promise<Room[]>;
  createRoom(room: InsertRoom): Promise<Room>;

  // Booking methods
  createBooking(booking: InsertBooking): Promise<Booking>;
  getBooking(id: number): Promise<Booking | undefined>;
  getBookingsByRoom(roomId: number): Promise<Booking[]>;
  checkAvailability(availability: AvailabilityCheck): Promise<Room[]>;

  // Contact methods
  createContact(contact: InsertContact): Promise<Contact>;
  getAllContacts(): Promise<Contact[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private rooms: Map<number, Room>;
  private bookings: Map<number, Booking>;
  private contacts: Map<number, Contact>;
  private currentUserId: number;
  private currentRoomId: number;
  private currentBookingId: number;
  private currentContactId: number;

  constructor() {
    this.users = new Map();
    this.rooms = new Map();
    this.bookings = new Map();
    this.contacts = new Map();
    this.currentUserId = 1;
    this.currentRoomId = 1;
    this.currentBookingId = 1;
    this.currentContactId = 1;

    // Initialize with sample rooms
    this.initializeRooms();
  }

  private initializeRooms() {
    const sampleRooms: InsertRoom[] = [
      {
        name: "Deluxe King Room",
        description: "Spacious room with king bed, city views, and luxury amenities",
        price: "299.00",
        category: "deluxe",
        maxGuests: 2,
        amenities: ["King Bed", "City View", "WiFi", "Room Service"],
        imageUrl: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        available: true,
      },
      {
        name: "Executive Suite",
        description: "Luxurious suite with separate living area and premium amenities",
        price: "459.00",
        category: "suite",
        maxGuests: 4,
        amenities: ["Suite", "Living Room", "Balcony", "Premium WiFi"],
        imageUrl: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        available: true,
      },
      {
        name: "Ocean View Room",
        description: "Breathtaking ocean views with premium comfort and style",
        price: "389.00",
        category: "premium",
        maxGuests: 2,
        amenities: ["Ocean View", "Queen Bed", "Marble Bath", "Mini Bar"],
        imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        available: true,
      },
      {
        name: "Presidential Suite",
        description: "Ultimate luxury with dining area, fireplace, and butler service",
        price: "899.00",
        category: "suite",
        maxGuests: 6,
        amenities: ["2 Bedrooms", "Butler Service", "Fireplace", "Dining Area"],
        imageUrl: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        available: true,
      },
      {
        name: "Business Twin Room",
        description: "Perfect for business travelers with work desk and meeting space",
        price: "259.00",
        category: "deluxe",
        maxGuests: 2,
        amenities: ["Twin Beds", "Work Desk", "High-Speed WiFi", "Business Center Access"],
        imageUrl: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        available: true,
      },
      {
        name: "Family Room",
        description: "Spacious family accommodation with connecting rooms available",
        price: "359.00",
        category: "family",
        maxGuests: 4,
        amenities: ["2 Queen Beds", "Kid-Friendly", "Extra Space", "Family Amenities"],
        imageUrl: "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        available: true,
      },
    ];

    sampleRooms.forEach(room => this.createRoom(room));
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Room methods
  async getAllRooms(): Promise<Room[]> {
    return Array.from(this.rooms.values());
  }

  async getRoom(id: number): Promise<Room | undefined> {
    return this.rooms.get(id);
  }

  async getRoomsByCategory(category: string): Promise<Room[]> {
    return Array.from(this.rooms.values()).filter(room => room.category === category);
  }

  async createRoom(insertRoom: InsertRoom): Promise<Room> {
    const id = this.currentRoomId++;
    const room: Room = { ...insertRoom, id };
    this.rooms.set(id, room);
    return room;
  }

  // Booking methods
  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = this.currentBookingId++;
    const booking: Booking = { 
      ...insertBooking, 
      id,
      createdAt: new Date(),
    };
    this.bookings.set(id, booking);
    return booking;
  }

  async getBooking(id: number): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }

  async getBookingsByRoom(roomId: number): Promise<Booking[]> {
    return Array.from(this.bookings.values()).filter(booking => booking.roomId === roomId);
  }

  async checkAvailability(availability: AvailabilityCheck): Promise<Room[]> {
    // Simple availability check - in a real app, this would check against actual bookings
    const allRooms = await this.getAllRooms();
    return allRooms.filter(room => 
      room.available && 
      room.maxGuests >= availability.guests
    );
  }

  // Contact methods
  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.currentContactId++;
    const contact: Contact = { 
      ...insertContact, 
      id,
      createdAt: new Date(),
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async getAllContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }
}

export const storage = new MemStorage();
