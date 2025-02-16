import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { SkipThrottle, Throttle } from "@nestjs/throttler";
import { Prisma } from "@prisma/client";
import { EmployeesService } from "./employees.service";

@SkipThrottle()
@Controller("employees")
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  create(@Body() createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.employeesService.create(createEmployeeDto);
  }

  @SkipThrottle({ default: false })
  @Get()
  findAll(@Query("role") role?: "INTERN" | "ENGINEER" | "ADMIN") {
    return this.employeesService.findAll(role);
  }

  @Throttle({ short: { ttl: 2000, limit: 1 } })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.employeesService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    return this.employeesService.update(+id, updateEmployeeDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.employeesService.remove(+id);
  }
}
