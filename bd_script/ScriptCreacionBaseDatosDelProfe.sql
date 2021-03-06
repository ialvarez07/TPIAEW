
CREATE DATABASE [Turicor] ON  PRIMARY 
( NAME = N'Turicor', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL10_50.SQLEXPRESS\MSSQL\DATA\Turicor.mdf' , SIZE = 3072KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'Turicor_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL10_50.SQLEXPRESS\MSSQL\DATA\Turicor_log.ldf' , SIZE = 1024KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [Turicor] SET COMPATIBILITY_LEVEL = 100
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [Turicor].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [Turicor] SET ANSI_NULL_DEFAULT OFF
GO
ALTER DATABASE [Turicor] SET ANSI_NULLS OFF
GO
ALTER DATABASE [Turicor] SET ANSI_PADDING OFF
GO
ALTER DATABASE [Turicor] SET ANSI_WARNINGS OFF
GO
ALTER DATABASE [Turicor] SET ARITHABORT OFF
GO
ALTER DATABASE [Turicor] SET AUTO_CLOSE OFF
GO
ALTER DATABASE [Turicor] SET AUTO_CREATE_STATISTICS ON
GO
ALTER DATABASE [Turicor] SET AUTO_SHRINK OFF
GO
ALTER DATABASE [Turicor] SET AUTO_UPDATE_STATISTICS ON
GO
ALTER DATABASE [Turicor] SET CURSOR_CLOSE_ON_COMMIT OFF
GO
ALTER DATABASE [Turicor] SET CURSOR_DEFAULT  GLOBAL
GO
ALTER DATABASE [Turicor] SET CONCAT_NULL_YIELDS_NULL OFF
GO
ALTER DATABASE [Turicor] SET NUMERIC_ROUNDABORT OFF
GO
ALTER DATABASE [Turicor] SET QUOTED_IDENTIFIER OFF
GO
ALTER DATABASE [Turicor] SET RECURSIVE_TRIGGERS OFF
GO
ALTER DATABASE [Turicor] SET  DISABLE_BROKER
GO
ALTER DATABASE [Turicor] SET AUTO_UPDATE_STATISTICS_ASYNC OFF
GO
ALTER DATABASE [Turicor] SET DATE_CORRELATION_OPTIMIZATION OFF
GO
ALTER DATABASE [Turicor] SET TRUSTWORTHY OFF
GO
ALTER DATABASE [Turicor] SET ALLOW_SNAPSHOT_ISOLATION OFF
GO
ALTER DATABASE [Turicor] SET PARAMETERIZATION SIMPLE
GO
ALTER DATABASE [Turicor] SET READ_COMMITTED_SNAPSHOT OFF
GO
ALTER DATABASE [Turicor] SET HONOR_BROKER_PRIORITY OFF
GO
ALTER DATABASE [Turicor] SET  READ_WRITE
GO
ALTER DATABASE [Turicor] SET RECOVERY FULL
GO
ALTER DATABASE [Turicor] SET  MULTI_USER
GO
ALTER DATABASE [Turicor] SET PAGE_VERIFY CHECKSUM
GO
ALTER DATABASE [Turicor] SET DB_CHAINING OFF
GO
EXEC sys.sp_db_vardecimal_storage_format N'Turicor', N'ON'
GO
USE [Turicor]
GO
/****** Object:  ForeignKey [FK_Reserva_ToCliente]    Script Date: 06/12/2017 01:09:37 ******/
ALTER TABLE [dbo].[Reserva] DROP CONSTRAINT [FK_Reserva_ToCliente]
GO
/****** Object:  ForeignKey [FK_Reserva_ToVendedor]    Script Date: 06/12/2017 01:09:37 ******/
ALTER TABLE [dbo].[Reserva] DROP CONSTRAINT [FK_Reserva_ToVendedor]
GO
/****** Object:  Table [dbo].[Reserva]    Script Date: 06/12/2017 01:09:37 ******/
ALTER TABLE [dbo].[Reserva] DROP CONSTRAINT [FK_Reserva_ToCliente]
GO
ALTER TABLE [dbo].[Reserva] DROP CONSTRAINT [FK_Reserva_ToVendedor]
GO
DROP TABLE [dbo].[Reserva]
GO
/****** Object:  Table [dbo].[Vendedor]    Script Date: 06/12/2017 01:09:37 ******/
DROP TABLE [dbo].[Vendedor]
GO
/****** Object:  Table [dbo].[Cliente]    Script Date: 06/12/2017 01:09:37 ******/
DROP TABLE [dbo].[Cliente]
GO
/****** Object:  Table [dbo].[Cliente]    Script Date: 06/12/2017 01:09:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Cliente](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](100) NOT NULL,
	[Apellido] [varchar](100) NOT NULL,
	[NroDocumento] [varchar](20) NOT NULL,
 CONSTRAINT [PK__tmp_ms_x__3214EC07172B2C26] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Vendedor]    Script Date: 06/12/2017 01:09:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Vendedor](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](200) NOT NULL,
 CONSTRAINT [PK__tmp_ms_x__3214EC07E1F22CDF] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Reserva]    Script Date: 06/12/2017 01:09:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Reserva](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CodigoReserva] [varchar](50) NOT NULL,
	[FechaReserva] [varchar](50) NOT NULL,
	[IdCliente] [int] NOT NULL,
	[IdVendedor] [int] NOT NULL,
	[Costo] [numeric](8, 2) NOT NULL,
	[PrecioVenta] [numeric](8, 2) NOT NULL,
	[IdVehiculoCiudad] [int] NOT NULL,
	[IdCiudad] [int] NOT NULL,
	[IdPais] [int] NOT NULL,
 CONSTRAINT [PK__tmp_ms_x__3214EC07B000491F] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  ForeignKey [FK_Reserva_ToCliente]    Script Date: 06/12/2017 01:09:37 ******/
ALTER TABLE [dbo].[Reserva]  WITH CHECK ADD  CONSTRAINT [FK_Reserva_ToCliente] FOREIGN KEY([IdCliente])
REFERENCES [dbo].[Cliente] ([Id])
GO
ALTER TABLE [dbo].[Reserva] CHECK CONSTRAINT [FK_Reserva_ToCliente]
GO
/****** Object:  ForeignKey [FK_Reserva_ToVendedor]    Script Date: 06/12/2017 01:09:37 ******/
ALTER TABLE [dbo].[Reserva]  WITH CHECK ADD  CONSTRAINT [FK_Reserva_ToVendedor] FOREIGN KEY([IdVendedor])
REFERENCES [dbo].[Vendedor] ([Id])
GO
ALTER TABLE [dbo].[Reserva] CHECK CONSTRAINT [FK_Reserva_ToVendedor]
GO
