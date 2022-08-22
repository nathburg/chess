# chess

I made this code as a proof of concept for the basic structure of what we'd need to do to make a working chess game. With this basis in place I'm extremely confident now that we can get everything done that we need to and much more in one week. The layout is as minimal as possible because I was just figuring out functionality. Right now only pawns are functional, but they were the test case and can be the example to design the other pieces.

I'm gonna run through the basic structure of the code really quickly. There are 64 buttons in the HTML document, each of which represent a square on the chess board. The state of the chessboard is stored as an object called **positions**, which has 64 properties.

The first thing I need to explain is that each of the keys is stored as what looks like a number, like 13, or 54, or 87. This is actually intended to be an ordered pair, like from algebra. It's a way to mark each square on the grid. In algebra traditionally you write it as (x, y), meaning x units distance on the horizontal dimension and y units distance on the vertical dimension. Instead of writing (1, 3), meaning the square in the 1st column (from the left) and the 3rd row (from the bottom), I simply wrote it 13. 54 is the 5th column over, and 4 rows up, etc. This is also how I gave the HTML buttons ids.

Each property in the object **positions** has one of those two-digit coordinates as the key, and the value is another object with three properties explaining what's at that position. The properties are color (black or white), piece (pawn, rook, etc), and image, which is what represents that piece visually in the square. I went extremely minimal with the image and have it just a bit of text, but it can be easily swapped out for a proper image.

The board is rendered based on the state of **positions**. Each turn changes between whose move it is, 'white' or 'black'. Event listeners are added to the squares that have pieces with the present player's color, so during white's turn all squares with a white piece become active buttons. The buttons are determined by what piece is there. I've only built out pawns, but I'll explain briefly how it will work in general.

When you click on a piece, the squares to which that piece can move become marked with an x. If you then click on a square with an x, the piece will move there. If an enemy piece is there, the piece will be taken. If you click on a piece and the x's appear, but you change your mind and want to move another piece instead, you can simply click another piece and x's will appear for it instead.

The pawn is a function that takes as input the position it's on, and produces as output the positions it can move to.

From here there's plenty to do. Build out the functions for the other pieces. Have a function that can tell when the king is in check, and checkmate, which ends the game. Great styling, obviously. Syncing this with supabase and making it playable between two players on different computers. Keep track of your games, keep unfinished games saved, whatever we want as stretch goals.

There are a couple of little bugs I found, but play around with it in the browser and check out those pawns moving around!