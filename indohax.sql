-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 15, 2024 at 01:12 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `indohax`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `win` int(11) NOT NULL,
  `loses` int(11) NOT NULL,
  `goals` int(11) NOT NULL,
  `assists` int(11) NOT NULL,
  `auth` varchar(255) NOT NULL,
  `stars` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `password`, `email`, `win`, `loses`, `goals`, `assists`, `auth`, `stars`) VALUES
(1, '', '', '', 0, 0, 0, 0, 'kRVxzmyLmivSVhGQv7UWlzUvxiRIFdlV6uFfoWAaq94', 110),
(15, '', '', '', 0, 0, 0, 0, 'EKGPaC2usPnvew9o0KH9P6J3nSmBOpKf3meC25VidQo', 0),
(16, '', '', '', 0, 0, 0, 0, 'W_tAN_iXy5Wt_3MfTZrrNFTH8nmA-OsNTatBiqC49ac', 0),
(17, '', '', '', 0, 0, 0, 0, 'zxN_79XrO7bpfgGi7nT4vP1xv3YHScXdpU5rarFW3cA', 32),
(18, '', '', '', 0, 0, 0, 0, 'FEDzSrxKWH2Zq5h7i4vTFtW0BOd1I1Kh9AaSAEcySHc', 4),
(19, '', '', '', 0, 0, 0, 0, '6VF54-3Xbq2kcmOQL3uQGA2_n5YAWlrwIektaNTDHH4', 15),
(20, '', '', '', 0, 0, 0, 0, 'oCk6n6FWrfoalDXXPijIKiPkZG9O1qZsoNmUnJ8ECbg', 120),
(21, '', '', '', 0, 0, 0, 0, '2IZ4jmEek8txwdvmqR4Ycb2azMtdZzjkuIVrO8EPJM8', 17),
(22, '', '', '', 0, 0, 0, 0, 'vkNo88OaFpoxuu1CuoFmVH-aPG99ytGDMBg1VddlHH0', 15),
(23, '', '', '', 0, 0, 0, 0, 'u_BPhLYKxNb4ja7pcjpD_5VVKudJMmXxhMkt7EM9kd8', 9),
(24, '', '', '', 0, 0, 0, 0, 'qPaykSdz5lhORXSZZfQOmI4KEnxqy_8RRGaSIIJYQ90', 55),
(25, '', '', '', 0, 0, 0, 0, 'f2c9ql_WQ3qh28hv2fN5uZHq8E_bFUuevWIU_EwJezA', 9),
(26, '', '', '', 0, 0, 0, 0, 'OOCECccJhROT4hr2zuiVwhb0CDIWRMp_umZIaf0Lvgw', 22),
(27, '', '', '', 0, 0, 0, 0, 'CFp6do_FO3UF7LyBJeclOzW2MlyewGjR_9oA2k50VHo', 8),
(28, '', '', '', 0, 0, 0, 0, '_8P7sY_l5X68bezbmYc9cA_X_mbyfr_iM_JdfhyEuDY', 13),
(29, '', '', '', 0, 0, 0, 0, '9tIWwPAUnKMfVvTffOxg8erMgo6BKtwR4Z14e_WoOQ8', 13),
(30, '', '', '', 0, 0, 0, 0, 'R7_d_6xeIT3e81k3V0mQE36_xgpULrJZXk18AbZf9mM', 46),
(31, '', '', '', 0, 0, 0, 0, 'O90gc6c03GDEuZ8fERWUsWDgPX1D63pOYW00oPA2_-o', 34),
(32, '', '', '', 0, 0, 0, 0, '3iGNKh6dRU8y0SLUL3oTUpM6Gea01zgW6lVmxhbY_rw', 9),
(33, '', '', '', 0, 0, 0, 0, 'XfUwkQ4kKk-bJbhuPEO9WlJn67rdFcCA6zeyOX5bEeY', 17),
(34, '', '', '', 0, 0, 0, 0, '29T0TjC3qUAV_1mIqYMoPIo01ozCer8sU3nyMMsofpw', 8),
(35, '', '', '', 0, 0, 0, 0, 'Da4kgW35PueIOm_yjOAAnOn0NjXy8bk9FOHT6hSS4fg', 8),
(36, '', '', '', 0, 0, 0, 0, 'eiqa2mgkt_Z0tI41_VSycAebSXAn8rQ_AdEBFovig7I', 6),
(37, '', '', '', 0, 0, 0, 0, '2hmo5i4yRUujWiqUumcw2e_JiDv9bgS0afYzVFRnpYU', 4),
(38, '', '', '', 0, 0, 0, 0, 'MNE4R8l6pbjn7EYeBmjHl9RJzfJX_vvoiqYMNV6vYPE', 6),
(39, '', '', '', 0, 0, 0, 0, 'm2wBGEtioz-tt03-cRmQ0uuGyHRkE8lI0G7WtMTrFeY', 29),
(40, '', '', '', 0, 0, 0, 0, 'mCVcem2j8WODzb5utFQKSsbQ125yTaMltgwFxHNpU_E', 6),
(41, '', '', '', 0, 0, 0, 0, 'zL2oWrgSA4VjPXW4RzapwBBTKNDMjrXAJ7A1FicLZCY', 8),
(42, '', '', '', 0, 0, 0, 0, 'zBSq6pMNFviwcVhoUe88n_BlvFjrIe5mWqvU4zwrUnQ', 5),
(43, '', '', '', 0, 0, 0, 0, 'jCq_ctUihLig-NJZ17n9VSNdnJCIt-8ACXljWnz1ug8', 6),
(44, '', '', '', 0, 0, 0, 0, '2Yf2nZHe9JdTIFj8i_v6pmU3ahoX6NddqZPL5uQxG3k', 6),
(45, '', '', '', 0, 0, 0, 0, 'jNt370bOWlOwZeS_IppR4OeXcJ4Z6jTgcjH1hl358k8', 10),
(46, '', '', '', 0, 0, 0, 0, 'tM9Xn8VykJhlHkc-9O92FuV3BXmc7II72m4z4KMutWk', 11),
(47, '', '', '', 0, 0, 0, 0, '7dsix8ZPohFhxbIYruC8gIgLtGehAUnssSvfAqUlQOw', 7),
(48, '', '', '', 0, 0, 0, 0, 'ja5nCX2KMJJsx_dDBuc6cSCayc2vv9oDRemdVTcbVIQ', 11),
(49, '', '', '', 0, 0, 0, 0, 'uC4nur3ByKW_BLujsS9HvKmnRImPTnMn0TxoN_OHY70', 18),
(50, '', '', '', 0, 0, 0, 0, 'QfFvWhKkMn5RLBU5i2f7r349NgrP0Wi7UfXtIuHvC9Q', 12),
(51, '', '', '', 0, 0, 0, 0, 'duRmNgBmg0IXe87GD8t_NZ2ujMzKqaZ3sQTRZd-dG_E', 9),
(52, '', '', '', 0, 0, 0, 0, '09uNr4yCgUME-h4AE-RuvyivMFLPRd5uVd1DaqqoAUk', 9),
(53, '', '', '', 0, 0, 0, 0, 'FHUhQx9PYlYcJuWeA_Y0uTPvD_dgPIOtCErq4RhlkL0', 8),
(54, '', '', '', 0, 0, 0, 0, '9Z75CnFieAI4lMm-6YDyt3-f1cJe9yZd9u-DmtlHHQM', 10),
(55, '', '', '', 0, 0, 0, 0, 'gR4Wf_t6H50F-Xdq6Bgd82MI0LJZEWc8gw5Sk0Jbo9I', 15),
(56, '', '', '', 0, 0, 0, 0, 'epPYAGe12KUin3NuiY1gMXij88soF7ogLCTiPYBDri8', 9),
(57, '', '', '', 0, 0, 0, 0, 'H3DM0031sW0QBe8hblF_Nl0YVayMQAbIGuiSdu5QDKU', 4),
(58, '', '', '', 0, 0, 0, 0, 'qFr5VCyk6w1LPBt3YHVBmFXN5FMbImsZOn4zobfkFrM', 8),
(59, '', '', '', 0, 0, 0, 0, 'AP_hmSZSQV662INTHy6iNBjxDUzjHFYiEybjmv5M0BY', 9),
(60, '', '', '', 0, 0, 0, 0, 'pDHamDZgtCq33ajpwSqeMMlg6oaaEWrBoUHUVZPc42M', 7),
(61, '', '', '', 0, 0, 0, 0, 'K_yqfeDryyz5tX5fjWs1lBZfj-1P4bOXt0kYez2ruJQ', 7),
(62, '', '', '', 0, 0, 0, 0, 'D7YzSRetwqKAWe3zBKOxiSJvClt_JsHTB0fitBUiydI', 4),
(63, '', '', '', 0, 0, 0, 0, 'GYWQsobTri6-u9KLlytitFUJsx5pqTOU3fhQHDaVS6o', 11),
(64, '', '', '', 0, 0, 0, 0, '0ODR7CIzbHyCcrRY69Cqh1JV4CBGrBn_EhgwNUbWq_M', 8),
(65, '', '', '', 0, 0, 0, 0, 'cZ1uU4vG6nq-3KRPzaF686gFoRP9hBaVQUyuypT9wiY', 40),
(66, '', '', '', 0, 0, 0, 0, 'mMHl0Wncqi-_DsDYUJXVYhWtgWNJoWeUE_VTZQ8k_UM', 5),
(67, '', '', '', 0, 0, 0, 0, 'NNHsU1RDkAsnXLj7HFxF1alNFIMrYKs3wiANErnlXT8', 2),
(68, '', '', '', 0, 0, 0, 0, 'cnNjX-Z5PQFGJFoPKCrBZevCFXo52XyvMj0TldwnVus', 24),
(69, '', '', '', 0, 0, 0, 0, 'Xveuv5TF_acw6G1VgfzXmqviusCbfMR5y6jHLGteaW0', 10),
(70, '', '', '', 0, 0, 0, 0, 'F7s0aSRboyCHm2u392giwizmHQgzW581eZnekO2aJTE', 8),
(71, '', '', '', 0, 0, 0, 0, 'Qyrbd3A7CpROukNnzVS16VuglXQos4wyAsUX-kiXNaY', 13),
(72, '', '', '', 0, 0, 0, 0, 'ANneh78cy0BxPLBcwGkhi06lPgeDNXd_3y0074_Tt5Q', 8),
(73, '', '', '', 0, 0, 0, 0, 'hOfuIcBJVkfniD5d4e8clPde-V5tA5JxoKUMSUQQfx0', 10),
(74, '', '', '', 0, 0, 0, 0, 'SaxiJA_Ma1PCErZo8psdOENRpyJj_o5-Ip-CTekrqKw', 9),
(75, '', '', '', 0, 0, 0, 0, 'lxiQP8dthAQWMosm7b5rerC1TVxXeUT_NmGYeBMG-9g', 11),
(76, '', '', '', 0, 0, 0, 0, 'BfrqmKFIZ3sRgmQGswek6g-N4Smjdh2Rc-RsUz270QY', 2),
(77, '', '', '', 0, 0, 0, 0, 'Emcv_2zOlSNrCBL4nDo9EAjtjJpwfLk0X6Deic9Sh98', 0),
(78, '', '', '', 0, 0, 0, 0, 'ss1qrwzkx7ul2-m0k50GdbtCEnm4NteV9Xqmytvkhkk', 3),
(79, '', '', '', 0, 0, 0, 0, '1OFK8_Jf9R-UJhbp_ElWwGY47Dvh3VDpwiGsWETBFUo', 4),
(80, '', '', '', 0, 0, 0, 0, 'neG_FjpSsrYdyGfx2162Tn3a9yybVVUihPgpCq0878U', 22),
(81, '', '', '', 0, 0, 0, 0, 'CcJeNQgPx_ftikRfl6wn-b0boiOdP3QEIxbPiOedmdI', 24),
(82, '', '', '', 0, 0, 0, 0, 'UttnQ6sNYxtvGzTI3xkoXv4IZEi0KcUM0CwqdGXr14U', 2),
(83, '', '', '', 0, 0, 0, 0, '5-n9youeBa2K_uUd6cQeACBOatXx-o2jF0jsBUViRJM', 12),
(84, '', '', '', 0, 0, 0, 0, 'x5rTe1Y27AsmzvGTnGcQ-kaojY4ujjvsH3qrcozV7eM', 7),
(85, '', '', '', 0, 0, 0, 0, 'XCJJx-NPG40Jy_xQtSgNo9k4M_vuiEh0FMIURwLsVrE', 8),
(86, '', '', '', 0, 0, 0, 0, '8l4PmfvBXgeHcj3sp10ZKI_1Rt5BGnacqofAkwALC_Y', 7),
(87, '', '', '', 0, 0, 0, 0, '1zDqk747ta06CrzXBp9eiD_NpFEysNuDYJYd52xiH8g', 35),
(88, '', '', '', 0, 0, 0, 0, 'dxWJfIZIyPse_TxAN_UHoig0vABFoLu-Ure6pif5IZk', 6),
(89, '', '', '', 0, 0, 0, 0, '749AmQ8u9AiQyMfdM1HkpLXYf0G_0NceHxfulMwiw2Y', 3),
(90, '', '', '', 0, 0, 0, 0, 'fi1cf6b8IjzUF_K2ZsKoRyMpD85YF8TIGW6Z1j6nrww', 12),
(91, '', '', '', 0, 0, 0, 0, 'bW7akJRd7xCMiD55z2UE7DlKu8i-JqffR2Q4c0SUiIA', 12),
(92, '', '', '', 0, 0, 0, 0, 'uTv_W_bDQO1-aGpBc_x94Hp-iEKu0xRhmlOq4CJaFcQ', 11),
(93, '', '', '', 0, 0, 0, 0, '9QWkKPX5wE2W7VrvoMeMC7YIh2nGtJ13JPL4QO6rP8M', 15),
(94, '', '', '', 0, 0, 0, 0, 'lTKcfrXL-Ek2SG2AXtTP5_uXR94o1dXQ_S45-ZNzz08', 9),
(95, '', '', '', 0, 0, 0, 0, 'SMuYuu24DguO5Blrgr4enw_wCrkPta9i_bKPYLm0fMk', 6),
(96, '', '', '', 0, 0, 0, 0, '0kfLHvnG66xlmoUwMJDW5mgfP1MSceI9iXHA4aUfjbU', 22),
(97, '', '', '', 0, 0, 0, 0, 'Go3RvSUFMITh6BNM2HOKuYUIVtbY6HY4ygQaE8lt_vM', 4),
(98, '', '', '', 0, 0, 0, 0, '15InL6PKImMSH11vmV7mvtpBaupHPud4ZQiQ9SBBiCc', 4),
(99, '', '', '', 0, 0, 0, 0, 'cF9sVd0wBb7dbguIE9kc9e7y2eZV3gzy9j1hbMMOmpU', 5),
(100, '', '', '', 0, 0, 0, 0, 'cUIKazQD1H1NavcXmCb3xdo2lg7wj7gTI8UxGejekJo', 22),
(101, '', '', '', 0, 0, 0, 0, 'P7U-KB-S_r5I_0LQXRb4X5jkVu-RLiXTMIgyrGIgUg8', 9),
(102, '', '', '', 0, 0, 0, 0, 'aIw9QOElAHKl69BZ8jBNKK3OXEkT37dphzFrA1QOPCk', 10);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=103;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
