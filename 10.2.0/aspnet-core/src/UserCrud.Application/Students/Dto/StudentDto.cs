namespace UserCrud.Students.Dto
{
    public class StudentDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public int Age { get; set; }

        public int CollageId { get; set; }
        public string CollageName { get; set; }

        public int CountryId { get; set; }
        public string CountryName { get; set; }

        public int StateId { get; set; }
        public string StateName { get; set; }

        public int CityId { get; set; }
        public string CityName { get; set; }
    }
}
