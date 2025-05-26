import { order } from "../classes/orders";

export function showUserOrders(userId: string) {
    const userOrders = order.orders.filter(o => o.user.id === userId);
    if (userOrders.length === 0) {
        console.error("Error: No tienes pedidos registrados.");
        return false;
    }

    console.log("\nTus pedidos:");
    userOrders.forEach(o => {
        console.log(`- ID: ${o.id} | Estado: ${o.orderState}`);
    });

    return true;
}
