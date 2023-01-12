import random
import re


class TicTacToe:
    # Create the following attributes for an object in class TicTacToe
    def __init__(self, score1, score2, game_ended, board, win_combinations):
        self.scoreP1 = score1                   # Score for player O
        self.scoreP2 = score2                   # Score for player X
        self.ends = game_ended                  # When self.ends = True, the game is stopped
        self.board = board                      # Design a 3x3 board using dict
        # Create a list of possible combinations to win the game
        self.combination = win_combinations

    # Mark the game board at the specified position
    def mark(self, position, mark):
        self.board[position] = mark     # dict[key] = value
        return self.board

    # Display the game board
    def display(self):
        print(f'''
    {self.board[1]} | {self.board[2]} | {self.board[3]}
    ---------
    {self.board[4]} | {self.board[5]} | {self.board[6]}
    ---------
    {self.board[7]} | {self.board[8]} | {self.board[9]}
    ''')

    # Used when initiating a new game
    def new(self):
        print('Game started:')
        self.display()

    # Validate the player's input whether the move is valid or otherwise
    def validate(self, position):
        if position in range(1, 10):
            # list(dict.values())[index]
            if str(position) == list(self.board.values())[position - 1]:
                return True
        else:
            return False

    # Check if the current player wins
    def check_win(self, player_marker):
        player_combination = []
        for pos, mark in self.board.items():        # for key, value in dict.items()
            if mark == player_marker:
                # Append pos into list [player_combination]
                player_combination.append(pos)
        for win_list in self.combination:
            for i in win_list:                      # For every integer in winning combination
                if i not in player_combination:     # If any integer is not present in player's combination,
                    break                           # proceed to the next winning combination
            else:
                return True
        else:
            return False

    # Check if the game board is fully occupied
    def check_full(self):
        for i in list(self.board.values()):     # For every item in list(dict.values())
            if i != 'X' and i != 'O':
                return False
        else:
            return True

    # Update and show the players' score
    def score(self):
        print(f'''Current score:
    O - {self.scoreP1} pts
    X - {self.scoreP2} pts
    ''')

    # Ask the players if they want a rematch
    def restart(self):
        while True:
            restart = input("Restart game? Y or N? ").upper()
            if restart == 'Y':
                for i in range(1, 10):
                    self.board[i] = str(i)              # Reset the game board
                self.new()                              # Restart the game
                break                                   # Break the while loop
            elif restart == 'N':
                if self.scoreP1 > self.scoreP2:
                    print(f"Player O is victorious!")
                elif self.scoreP1 == self.scoreP2:
                    print(f"What a game!")
                else:
                    print(f"Player X is victorious!")
                print(f'''Final score:
    O - {self.scoreP1} pts
    X - {self.scoreP2} pts''')
                self.ends = True                        # Stop the game
                break                                   # Break the while loop

            # Allows the program to only accept Y or N as input
            elif not re.match("^[N,Y]*$", restart) or len(restart) > 1:
                print("Error! Please enter Y or N only!")


# TicTacToe(score1, score2, game_ended, board, win_combinations)
game = TicTacToe(0, 0, False, {
    1: '1', 2: '2', 3: '3',
    4: '4', 5: '5', 6: '6',
    7: '7', 8: '8', 9: '9'
}, [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
])
current_player = random.choice(['O', 'X'])      # Randomize the starting player
game.new()
while not game.ends:
    # Try-except block is added to prevent the game from crashing when receiving wrong inputs
    try:
        move = int(input(f"{current_player}'s turn, input: "))
        if game.validate(move) is True:
            game.mark(move, current_player)
            game.display()
            # Condition if a player wins
            if game.check_win(current_player) is True:
                print(f"{current_player} wins!")
                if current_player == 'O':
                    game.scoreP1 += 1
                else:
                    game.scoreP2 += 1
                game.score()
                game.restart()
                if game.scoreP1 < game.scoreP2:
                    current_player = 'O'
                elif game.scoreP1 > game.scoreP2:
                    current_player = 'X'
                else:
                    current_player = random.choice(['O', 'X'])
            elif game.check_win(current_player) is not True:
                if game.check_full() is True:                   # Condition if the game draws
                    print("Game ended in tie!")
                    game.scoreP1 += 0.5
                    game.scoreP2 += 0.5
                    game.score()
                    game.restart()
                    if game.scoreP1 < game.scoreP2:
                        current_player = 'O'
                    elif game.scoreP1 > game.scoreP2:
                        current_player = 'X'
                    else:
                        current_player = random.choice(['O', 'X'])
                else:                                               # Switch player
                    if current_player == 'O':
                        current_player = 'X'
                    else:
                        current_player = 'O'
        else:
            print("Wrong input! You can only select an empty box. Try again.")
            game.display()
    except ValueError:
        print("Please input a number from 1 to 9 only!")
        game.display()
