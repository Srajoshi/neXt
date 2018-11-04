module.exports = function (sequelize, DataTypes) {
  const Destinations = sequelize.define("Destinations", {
    destinationCountry: {
      type: DataTypes.STRING,
      allowNull: false
    },
    destinationState: {
      type: DataTypes.STRING,
      allowNull: true

    },
    destinationCity: {
      type: DataTypes.STRING,
      allowNull: true

    },
    dateFrom: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
      // allowNull: false
    },
    dateTO: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
      // allowNull: false
    }
  }, {
    validate: {
      datescheck() {
        if (this.dateFrom > this.dateTO) {
          throw new Error("End date must be same or greater than start date")
        }
      }
    }
  });

  Destinations.associate = function (models) {

    Destinations.hasMany(models.Reviews, {
      onDelete: "cascade"
    });

    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Destinations.belongsTo(models.Trips, {
      foreignKey: {
        allowNull: false
      }
    });

  }, {

    validate: {
      tripdatecheck() {
        if (this.associations.Trips.tripStartDate > this.dateFrom) {
          throw new Error("From date before trip start date")
        }
      }
    }
  }
  return Destinations;
};