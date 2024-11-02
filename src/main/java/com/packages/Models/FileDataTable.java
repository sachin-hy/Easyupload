package com.packages.Models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class FileDataTable {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	int id;
	
	@Column(name="UniqueId")
	String uniqueid;
	
	@Column(name="FilePath")
	String filepath;
	
	@Column(name="FileName")
	String filename;
	
	

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getUniqueid() {
		return uniqueid;
	}

	public void setUniqueid(String uniqueid) {
		this.uniqueid = uniqueid;
	}

	public String getFilepath() {
		return filepath;
	}

	public void setFilepath(String filepath) {
		this.filepath = filepath;
	}

	public String getFilename() {
		return filename;
	}

	public void setFilename(String filename) {
		this.filename = filename;
	}

	
	
	@Override
	public String toString() {
		return "FileDataTable [id=" + id + ", uniqueid=" + uniqueid + ", filepath=" + filepath + ", filename="
				+ filename + ", getId()=" + getId() + ", getUniqueid()=" + getUniqueid() + ", getFilepath()="
				+ getFilepath() + ", getFilename()=" + getFilename() + "]";
	}
	
	
}
