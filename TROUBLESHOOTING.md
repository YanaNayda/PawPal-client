# Troubleshooting Guide

## Network Connection Issues

### Problem: "Network Error" or "Failed to load chats"

**Solution Steps:**

1. **Check if server is running:**
   ```bash
   cd "PawPal Server"
   npm start
   ```
   You should see: "Server is running on http://0.0.0.0:3000"

2. **Verify your IP address:**
   ```bash
   ifconfig | grep "inet " | grep -v 127.0.0.1
   ```
   Look for your local IP (usually starts with 192.168.x.x)

3. **Update server configuration:**
   - Open `PawPal Client/config/serverConfig.js`
   - Update `SERVER_IP` to match your computer's IP address

4. **Test server connectivity:**
   ```bash
   cd "PawPal Server"
   node test-server.js
   ```

5. **Check firewall settings:**
   - Make sure port 3000 is not blocked
   - On Mac: System Preferences > Security & Privacy > Firewall

6. **Restart both client and server:**
   ```bash
   # Terminal 1 - Server
   cd "PawPal Server"
   npm start
   
   # Terminal 2 - Client
   cd "PawPal Client"
   npm start
   ```

### Problem: "WebSocket error"

**Solution Steps:**

1. **Check Socket.IO connection:**
   - Make sure server is running with Socket.IO
   - Verify CORS settings in server.js

2. **Update Socket.IO URL:**
   - Check `PawPal Client/config/serverConfig.js`
   - Ensure `SOCKET_URL` uses correct IP

3. **Test Socket.IO connection:**
   ```javascript
   // In browser console or React Native debugger
   const socket = io('http://192.168.1.83:3000');
   socket.on('connect', () => console.log('Connected!'));
   ```

### Problem: "Connection refused"

**Solution Steps:**

1. **Server not running:**
   - Start server: `cd "PawPal Server" && npm start`

2. **Wrong port:**
   - Check if port 3000 is available
   - Try different port: `PORT=3001 npm start`

3. **IP address changed:**
   - Recheck your IP: `ifconfig | grep "inet " | grep -v 127.0.0.1`
   - Update `serverConfig.js` with new IP

### Problem: "CORS error"

**Solution Steps:**

1. **Check server CORS settings:**
   - Verify `server.js` has proper CORS configuration
   - Should include: `origin: "*"`

2. **Check client requests:**
   - Ensure requests include proper headers
   - Verify Content-Type is set correctly

## Common Issues

### Issue: Messages not sending
- Check if user is authenticated
- Verify chat exists between users
- Check MongoDB connection

### Issue: Real-time updates not working
- Verify Socket.IO connection
- Check if user joined correct chat room
- Ensure event listeners are properly set up

### Issue: App crashes on chat screen
- Check if userData exists in context
- Verify all required props are passed
- Check for null/undefined values

## Debug Commands

### Check server status:
```bash
ps aux | grep node
```

### Check network connectivity:
```bash
ping 192.168.1.83
```

### Test API endpoints:
curl http://192.168.1.83:3000/api/v1/users
```

### Check MongoDB connection:
```bash
# In server console, should see: "MongoDB connected successfully"
```

## Configuration Files

### Server Configuration (`PawPal Server/server.js`):
- Port: 3000
- Host: 0.0.0.0 (all interfaces)
- CORS: enabled for all origins

### Client Configuration (`PawPal Client/config/serverConfig.js`):
- Update `SERVER_IP` to your computer's IP
- Default port: 3000
- Timeout: 10 seconds

## Getting Help

If issues persist:
1. Check server console for error messages
2. Check React Native debugger for client errors
3. Verify all dependencies are installed
4. Try restarting both client and server
5. Check network connectivity between devices 