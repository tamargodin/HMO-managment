import math


def menu():
    while True:
        choice = int(input("Enter 1 for rectangle, 2 for triangular, 3 for exit: "))
        if choice == 1:
            rectangle_input()
        elif choice == 2:
            triangular_input()
        elif choice == 3:
            print("Thank you!")
            break


def rectangle_input():
    while True:
        width = float(input("Enter width: "))
        if width >= 0:
            break

    while True:
        height = float(input("Enter height: "))
        if height >= 0:
            break

    if width == height or math.fabs(width - height) > 5:
        area = height * width
        print("The square area is:", area)
    else:
        scope = height * 2 + width * 2
        print("The tower area:", scope)


def triangular_input():
    while True:
        width = float(input("Enter width: "))
        if width >= 2:
            break

    while True:
        height = float(input("Enter height: "))
        if height >= 0:
            break

    triangular_choices(width, height)


def triangular_choices(width, height):
    choice = int(input("Enter 1 for scope calculation, 2 to print the triangle: "))
    if choice == 1:
        scope_calculation(width, height)
    elif choice == 2:
        print_building(width, height)


def scope_calculation(width, height):
    side2 = math.sqrt(width * width + height * height)
    scope = side2 * 2 + width
    print("The triangular scope is:", scope)


def print_building(width, height):
    if width % 2 == 0 or width > height * 2:
        print("Sorry, your triangle tower cannot be printed")
        return

    stars = 0
    remain = 0
    if (width - 2) // 2 != 0:
        stars = (height - 2) // ((width - 2) // 2)
        remain = (height - 2) % ((width - 2) // 2)

    print("Stars:", stars)
    print("Remainder:", remain)

    current_stars_num = 1
    spaces_to_print = ((width - current_stars_num) / 2)
    print("Spaces to print:", spaces_to_print)
    print(" " * int(spaces_to_print), "*", sep="")
    current_stars_num = 3

    for i in range(0, int(stars + remain)):
        spaces_to_print = ((width - current_stars_num) / 2)
        print(" " * int(spaces_to_print), "*" * int(current_stars_num), sep="")

    current_stars_num = 5
    while current_stars_num < width:
        for i in range(0, int(stars)):
            spaces_to_print = ((width - current_stars_num) / 2)
            print(" " * int(spaces_to_print), "*" * int(current_stars_num), sep="")
        current_stars_num += 2

    print("*" * int(width))

    if width == 3:
        for i in range(0, int(height - 2)):
            print("*" * 3)


def main():
    while True:
        choice = int(input("Enter 1 for rectangle, 2 for triangular, 3 for exit: "))
        if choice == 1:
            rectangle_input()
        elif choice == 2:
            triangular_input()
        elif choice == 3:
            print("Thank you!")
            break


if __name__ == "__main__":
    main()
