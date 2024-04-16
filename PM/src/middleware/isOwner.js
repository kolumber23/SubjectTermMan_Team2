const staticShoppingLists = [{
    listId: 1,
    name: "Weekend Party",
    owner: "mockOwnerUserId",
    items: [
        {
            name: "Chips",
            unit: "bag",
            amount: 3,
            bought: false
        }
    ],
    invitedUsers: [
        "userID1",
        "userID2"
    ],
    archived: false
  }];

  const isOwner = (req, res, next) => {
    // Extract the userId from request headers
    const userId = req.headers['x-user-id'];

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized: No user ID provided in headers." });
    }

    const { listId } = req.body;

    if (!listId) {
        return res.status(400).json({ message: "List ID is required." });
    }

    // Find the list by listId
    const list = staticShoppingLists.find(list => list.listId === parseInt(listId, 10));

    if (!list) {
        return res.status(404).json({ message: "List not found." });
    }

    // Check if the userId from headers matches the list's owner
    if (list.owner !== userId) {
        return res.status(403).json({ message: "Only the list owner can perform this action." });
    }

    // If checks pass, move to the next middleware or route handler
    next();
};

module.exports = isOwner;