<?php
session_start();

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    header('Location: index.html');
    exit;
}

// Get user data
$user = $_SESSION['user'];
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Dashboard</title>
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="css/dashboard.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>
<body>
    <div class="dashboard-container">
        <!-- Sidebar -->
        <div class="sidebar">
            <div class="sidebar-header">
                <h2>CompanyName</h2>
            </div>
            <div class="sidebar-user">
                <div class="user-avatar">
                    <i class="fas fa-user"></i>
                </div>
                <div class="user-info">
                    <h3><?php echo htmlspecialchars($user['name']); ?></h3>
                    <p><?php echo htmlspecialchars($user['email']); ?></p>
                </div>
            </div>
            <nav class="sidebar-nav">
                <ul>
                    <li class="active">
                        <a href="#"><i class="fas fa-home"></i> Dashboard</a>
                    </li>
                    <li>
                        <a href="#"><i class="fas fa-shopping-cart"></i> Products</a>
                    </li>
                    <li>
                        <a href="#"><i class="fas fa-store"></i> Marketplace</a>
                    </li>
                    <li>
                        <a href="#"><i class="fas fa-cog"></i> Settings</a>
                    </li>
                    <li>
                        <a href="backend/logout.php"><i class="fas fa-sign-out-alt"></i> Logout</a>
                    </li>
                </ul>
            </nav>
        </div>

        <!-- Main Content -->
        <div class="main-content">
            <header class="dashboard-header">
                <div class="header-search">
                    <i class="fas fa-search"></i>
                    <input type="text" placeholder="Search...">
                </div>
                <div class="header-actions">
                    <button class="btn btn-primary"><i class="fas fa-plus"></i> New Item</button>
                </div>