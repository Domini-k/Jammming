// Rename the playlist algorithm


useEffect(() => {
    const createPlaylist = async () => {
        if (!newPlaylistName) {
            return;
        }
        try {
            setIsLoading(true);
            setError(null);
            // Call to get current user's profile id
            const currentUserProfile = await spotifyService.getUserProfile()
            // Call to create new playlist
            const response = await spotifyService.createPlaylist(currentUserProfile.id, newPlaylistName);
            console.log(response);
            setListOfUserPlaylists([])
        } catch (err) {
            setError('Failed to create new playlist. Please try again.');
            console.error('Create playlist error:', err);
        } finally {
            setIsLoading(false);
        }
    };
    const timeoutId = setTimeout(() => {
        createPlaylist();
    }, 300);

    return () => clearTimeout(timeoutId);
}, [newPlaylistName]);