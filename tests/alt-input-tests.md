Instructions: Follow the numbered steps. After each step, check the expected outcome(s) after the `=>` delimiter.

# Test 1. Basic Puller Alt-Input

1. Launch http://localhost/forces-and-motion-basics/forces-and-motion-basics_en.html?brand=phet&ea&debugger&screens=1&logAriaLiveResponses
   using the playwright mcp.
2. Press tab. => "large blue puller" must have focus.
3. Press enter. => There must be a "Grabbed" message from aria-live.
4. Press enter. => Focus must move automatically to the "medium blue puller".
5. Use the arrow keys => Focus moves between the remaining 3 blue pullers.

# Test 2. Putting a Puller on the Rope, then bringing back to the toolbox

1. Launch http://localhost/forces-and-motion-basics/forces-and-motion-basics_en.html?brand=phet&ea&debugger&screens=1&logAriaLiveResponses
   using the playwright mcp.
2. Press tab. => "large blue puller" must have focus.
3. Press enter. => There must be a "Grabbed" message from aria-live.
4. Press enter. => Focus must move automatically to the "medium blue puller".
5. Tab until you get past the red pullers and to the large blue puller on the rope.
6. Press enter to pick up the large red puller.
7. Press the arrow keys until it is ready to move it back to the toolbox.
8. Press enter to drop it in the toolbox. Focus must remain on the puller.
9. Press the arrow keys to select a different puller in the toolbox.